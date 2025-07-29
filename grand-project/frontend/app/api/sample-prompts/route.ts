import { NextRequest, NextResponse } from "next/server";

let cachedPrompts: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const { feature } = await req.json();

    const webhookUrl = process.env.N8N_WEBHOOK_URL!;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feature }),
    });

    const data = await response.json();

    cachedPrompts = Array.isArray(data) ? data : [];

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { error: "Failed to fetch from n8n" },
      { status: 500 }
    );
  }
}

// Handle GET request: Return cached prompts
export async function GET() {
  try {
    // ✅ Return the cached array directly, no wrapping
    return NextResponse.json(cachedPrompts);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { error: "Failed to return prompts" },
      { status: 500 }
    );
  }
}
