// app/api/pitches/route.ts
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const recent = searchParams.get("recent"); // check for ?recent=true

  if (!userId) {
    return NextResponse.json(
      { error: "Missing or invalid userId" },
      { status: 400 }
    );
  }

  try {
    const whereClause = { userId };
    const orderClause = { createdAt: "desc" };
    const limit = recent === "true" ? 3 : undefined;

    const pitches = await prisma.pitch.findMany({
      where: whereClause,
      orderBy: orderClause,
      take: limit, // only applies if recent is true
    });

    return NextResponse.json( pitches );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching pitches" },
      { status: 500 }
    );
  }
}
