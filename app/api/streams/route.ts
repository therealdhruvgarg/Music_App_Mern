import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import { YT_REGEX } from "@/app/lib/utils";
import { getServerSession } from "next-auth";

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
});

const MAX_QUEUE_LEN = 20;

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();
        const user = await prismaClient.user.findFirst({
            where: {
                email: session?.user?.email ?? ""
            }
        });

        if (!user) {
            return NextResponse.json({
                message: "Unauthenticated"
            }, {
                status: 403
            });
        }

        const data = CreateStreamSchema.parse(await req.json());
        
        if (!data.url.trim()) {
            return NextResponse.json({
                message: "YouTube link cannot be empty"
            }, {
                status: 400
            });
        }

        const isYt = data.url.match(YT_REGEX);
        if (!isYt) {
            return NextResponse.json({
                message: "Invalid YouTube URL format"
            }, {
                status: 400
            });
        }

        const extractedId = data.url.split("?v=")[1];
        
        // Log API Response
        const res = await youtubesearchapi.GetVideoDetails(extractedId);
        console.log('API Response:', res);

        // Check if the API response contains the expected data
        if (!res || !res.thumbnail || !res.thumbnail.thumbnails) {
            return NextResponse.json({
                message: "Invalid API response: Missing thumbnails"
            }, {
                status: 500
            });
        }

        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: {width: number}, b: {width: number}) => a.width < b.width ? -1 : 1);

        const existingActiveStreams = await prismaClient.stream.count({
            where: {
                userId: data.creatorId,
                played: false
            }
        });

        if (existingActiveStreams >= MAX_QUEUE_LEN) {
            return NextResponse.json({
                message: "Queue is full"
            }, {
                status: 429
            });
        }

        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                addedBy: user.id,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "Can't find video",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
                bigImg: thumbnails[thumbnails.length - 1].url ?? "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
            }
        });

        return NextResponse.json({
            ...stream,
            hasUpvoted: false,
            upvotes: 0
        });
    } catch(e) {
        console.error('Error while adding a stream:', e);
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 500
        });
    }
}

export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const session = await getServerSession();
    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });

    if (!user) {
        return NextResponse.json({
            message: "Unauthenticated"
        }, {
            status: 403
        })
    }

    if (!creatorId) {
        return NextResponse.json({
            message: "Error"
        }, {
            status: 411
        })
    }

    const [streams, activeStream] = await Promise.all([
        prismaClient.stream.findMany({
            where: {
                userId: creatorId,
                played: false
            },
            include: {
                _count: {
                    select: {
                        upvotes: true
                    }
                },
                upvotes: {
                    where: {
                        userId: user.id
                    }
                }
            }
        }),
        prismaClient.currentStream.findFirst({
            where: {
                userId: creatorId
            },
            include: {
                stream: true
            }
        })
    ]);

    const isCreator = user.id === creatorId;

    return NextResponse.json({
        streams: streams.map(({_count, ...rest}) => ({
            ...rest,
            upvotes: _count.upvotes,
            haveUpvoted: rest.upvotes.length ? true : false
        })),
        activeStream,
        creatorId,
        isCreator
    });
}