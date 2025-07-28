// app/api/usage/route.ts

import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";

const MAX_CREDITS = 5;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const feature = searchParams.get("feature");

  if (!feature) {
    return new Response(JSON.stringify({ error: "Missing feature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const usage = await prisma.usage.findUnique({
    where: { userId: user.id },
  });

  if (!usage) {
    return new Response(JSON.stringify({ remaining: MAX_CREDITS }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const mapping: Record<string, number> = {
    PITCH_SUMMARIZER: usage.summarizerCount,
    INVESTOR_EMAIL: usage.investorEmailCount,
    PITCH_FEEDBACK: usage.feedbackCount,
    ELEVATOR_REWRITE: usage.elevatorCount,
  };

  const used = mapping[feature] ?? 0;
  const remaining = Math.max(0, MAX_CREDITS - used);

  return new Response(JSON.stringify({ remaining }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
