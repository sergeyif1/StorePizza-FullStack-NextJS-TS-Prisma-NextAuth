import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

function normalizeImageUrl(url: string): string {
  return url
    .replace(/^@public\/?/, "/")
    .replace(/^\/public\/?/, "/")
    .replace(/\/+/g, "/");
}

export async function GET() {
  const stories = await prisma.story.findMany({
    include: {
      items: true,
    },
  });

  const normalizedStories = stories.map((story) => ({
    ...story,
    previewImageUrl: normalizeImageUrl(story.previewImageUrl),
    items: story.items.map((item) => ({
      ...item,
      sourceUrl: normalizeImageUrl(item.sourceUrl),
    })),
  }));

  return NextResponse.json(normalizedStories);
}

// import { prisma } from '@/prisma/prisma-client';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const stories = await prisma.story.findMany({
//     include: {
//       items: true,
//     },
//   });

//   return NextResponse.json(stories);
// }
