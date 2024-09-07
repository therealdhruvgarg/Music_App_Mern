import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import { YT_REGEX } from "@/app/lib/utils";
import { getServerSession } from "next-auth";

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string().url()  // Ensuring it's a valid URL
});

const MAX_QUEUE_LEN = 20;

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());

        // Check for valid YouTube URL
        const isYt = data.url.match(YT_REGEX);
        if (!isYt) {
            return NextResponse.json(
                { message: "Invalid YouTube URL format" },
                { status: 400 }
            );
        }

        // Extract video ID from URL
        const extractedId = data.url.split("?v=")[1] || "";
        if (!extractedId) {
            return NextResponse.json(
                { message: "Unable to extract video ID from URL" },
                { status: 400 }
            );
        }

        // Fetch video details using YouTube API
        const res = await youtubesearchapi.GetVideoDetails(extractedId);

        const thumbnails = res?.thumbnail?.thumbnails || [];
        if (!thumbnails.length) {
            return NextResponse.json(
                { message: "No thumbnails found" },
                { status: 404 }
            );
        }

        thumbnails.sort((a: { width: number }, b: { width: number }) =>
            a.width < b.width ? -1 : 1
        );

        // Check for the existing active streams
        const existingActiveStream = await prismaClient.stream.count({
            where: { userId: data.creatorId },
        });

        if (existingActiveStream >= MAX_QUEUE_LEN) {
            return NextResponse.json(
                { message: "Stream limit reached" },
                { status: 400 }
            );
        }

        // Create a new stream entry in the database
        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "Unknown Video",
                smallImg:
                    thumbnails.length > 1
                        ? thumbnails[thumbnails.length - 2].url
                        : thumbnails[0].url ?? "default_image_url",
                bigImg:
                    thumbnails[thumbnails.length - 1].url ??
                    "default_image_url",
            },
        });

        return NextResponse.json({
            ...stream,
            hasUpvoted: false,
            upvotes: 0,
        });
    } catch (e) {
        console.error("Error while creating stream:", e);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const creatorId = req.nextUrl.searchParams.get("creatorId");
        const session = await getServerSession();

        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthenticated" },
                { status: 403 }
            );
        }

        // Find the user associated with the session
        const user = await prismaClient.user.findFirst({
            where: { email: session.user.email ?? "" },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Unauthenticated" },
                { status: 403 }
            );
        }

        if (!creatorId) {
            return NextResponse.json(
                { message: "Creator ID is required" },
                { status: 400 }
            );
        }

        // Fetch streams and active stream
        const [streams, activeStream] = await Promise.all([
            prismaClient.stream.findMany({
                where: { userId: creatorId, played: false },
                include: {
                    _count: { select: { upvotes: true } },
                    upvotes: { where: { userId: user.id } },
                },
            }),
            prismaClient.currentStream.findFirst({
                where: { userId: creatorId },
                include: { stream: true },
            }),
        ]);

        return NextResponse.json({
            streams: streams.map(({ _count, upvotes, ...rest }) => ({
                ...rest,
                upvotes: _count.upvotes,
                haveUpvoted: upvotes.length > 0,
            })),
            activeStream,
        });
    } catch (e) {
        console.error("Error fetching streams:", e);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
