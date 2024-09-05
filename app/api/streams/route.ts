import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

var YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;


const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = data.url.match(YT_REGEX)
    if (!isYt) {
      return NextResponse.json(
        {
          message: "Wrong URL",
        },
        {
          status: 411,
        }
      );
    }
    const extractedId = data.url.split("?v=")[1];
    const res = await youtubesearchapi.GetVideoDetails(extractedId );
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a:{width:number}, b:{width:number}) => a.width < b.width?-1:1);

    const stream =await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "No title",
        smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length-2].url : thumbnails[thumbnails.length-1].url)??"http://ts2.mm.bing.net/th?id=OIP.3fbO9aGQHDwlC4KTS7_3qgHaMs&pid=15.1",
        bigImg: thumbnails[thumbnails.length-1].url ?? "http://ts2.mm.bing.net/th?id=OIP.3fbO9aGQHDwlC4KTS7_3qgHaMs&pid=15.1"
      },
    });
    return NextResponse.json({
      message: "Stream added successfully",
      id: stream.id
    })
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while adding the stream",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req:NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.user.findMany({
      where: {
         id: creatorId ?? ""
      }
  })
return NextResponse.json({streams})
}