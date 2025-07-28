// app/api/generate-pitch/route.ts
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const MAX_PER_FEATURE = 5;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { feature, inputText: inputPrompt, tone } = body;

  if (!feature || !inputPrompt) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.id;
  const { usedCount, featureField } = await checkQuota(userId, feature);

  if (usedCount >= MAX_PER_FEATURE) {
    return NextResponse.json(
      { error: "You’ve reached your monthly limit for this feature." },
      { status: 403 }
    );
  }

  // Prepare payload for webhook
  let payload: Record<string, any> = {
    userId,
    feature,
  };

  if (feature === "ELEVATOR_REWRITE") {
    payload.startupDescription = inputPrompt;
    payload.pitchTone = tone;
  } else {
    payload.inputPrompt = inputPrompt;
    payload.tone = tone;
  }

  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
  if (!N8N_WEBHOOK_URL) {
    return NextResponse.json(
      { error: "Missing N8N_WEBHOOK_URL in environment." },
      { status: 500 }
    );
  }

  // then use it
  const webhookRes = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!webhookRes.ok) {
    return NextResponse.json(
      { error: "Failed to call AI backend" },
      { status: 500 }
    );
  }

  let webhookData;
  try {
    webhookData = await webhookRes.json();
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON from AI backend" },
      { status: 500 }
    );
  }

  // Handle array format
  let finalOutput = "";

  if (Array.isArray(webhookData) && webhookData.length > 0) {
    const item = webhookData[0];

    if (item.subject || item.body || item.signature) {
      finalOutput = [item.subject, item.body, item.signature]
        .filter(Boolean)
        .join("\n\n");
    } else if (item.rewrittenPitch) {
      finalOutput = item.rewrittenPitch;
    }
  } else if (typeof webhookData === "object") {
    finalOutput = webhookData.outputText || webhookData.rewrittenPitch || "";
  }

  // Save to DB
  await prisma.pitch.create({
    data: {
      userId,
      featureType: feature,
      input: inputPrompt,
      output: finalOutput,
    },
  });

  await prisma.usage.update({
    where: { userId },
    data: {
      [featureField]: { increment: 1 },
    },
  });

  return NextResponse.json({ outputText: finalOutput }, { status: 200 });
}

async function checkQuota(userId: string, feature: string) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let usage = await prisma.usage.findFirst({ where: { userId } });

  if (!usage || usage.month !== month || usage.year !== year) {
    usage = await prisma.usage.upsert({
      where: { userId },
      create: { userId, month, year },
      update: { month, year },
    });
  }

  const mapping: Record<string, { count: number; featureField: string }> = {
    PITCH_SUMMARIZER: {
      count: usage?.summarizerCount || 0,
      featureField: "summarizerCount",
    },
    INVESTOR_EMAIL: {
      count: usage?.investorEmailCount || 0,
      featureField: "investorEmailCount",
    },
    PITCH_FEEDBACK: {
      count: usage?.feedbackCount || 0,
      featureField: "feedbackCount",
    },
    ELEVATOR_REWRITE: {
      count: usage?.elevatorCount || 0,
      featureField: "elevatorCount",
    },
  };

  const usageInfo = mapping[feature] || mapping["PITCH_SUMMARIZER"];
  return { usedCount: usageInfo.count, featureField: usageInfo.featureField };
}
