import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email?.trim();
    const name = body?.name?.trim() || null;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: name ? { name } : {},
      create: { email, name },
    });

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Error saving user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
