// app/api/pitches/route.ts
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing or invalid userId" },
      { status: 400 }
    );
  }

  try {
    const pitches = await prisma.pitch.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pitches);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching pitches" },
      { status: 500 }
    );
  }
}
