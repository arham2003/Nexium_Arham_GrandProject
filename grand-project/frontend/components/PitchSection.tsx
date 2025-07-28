"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const FEATURES = [
  { key: "INVESTOR_EMAIL", label: "Investor Email Draft Assistant ⬅️" },
  { key: "ELEVATOR_REWRITE", label: "Elevator Pitch Rewriter ⬅️" },
] as const;

type FeatureKey = (typeof FEATURES)[number]["key"];
type SamplePrompt = { id: number; prompt: string };

export default function PitchPage() {
  const [selected, setSelected] = useState<FeatureKey>("INVESTOR_EMAIL");
  const [inputText, setInputText] = useState("");
  const [emailTone, setEmailTone] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [samplePrompts, setSamplePrompts] = useState<SamplePrompt[]>([]);
  const [fetchingPrompts, setFetchingPrompts] = useState(false);
  const [creditsLeft, setCreditsLeft] = useState<number | null>(null);
  const [pitchTone, setPitchTone] = useState("");

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/login");
        return;
      }

      setUser(user);
      const nameFromEmail =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email.split("@")[0];

      try {
        await fetch(`${window.location.origin}/api/users/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, name: nameFromEmail }),
        });
      } catch (err) {
        console.error("Failed to sync user with MongoDB", err);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchPromptsFromN8n = async () => {
      if (selected !== "INVESTOR_EMAIL") return;

      setFetchingPrompts(true);
      setSamplePrompts([]);

      try {
        await fetch("/api/sample-prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feature: "INVESTOR_EMAIL" }),
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const res = await fetch("/api/sample-prompts");
        if (!res.ok) throw new Error(`Failed to fetch prompts: ${res.status}`);

        const contentType = res.headers.get("content-type");
        const raw = await res.text();

        if (contentType && contentType.includes("application/json")) {
          try {
            const data = JSON.parse(raw);
            const prompts = Array.isArray(data.prompts) ? data.prompts : data;

            if (
              Array.isArray(prompts) &&
              prompts.every((p) => p.prompt && p.id)
            ) {
              setSamplePrompts(prompts.slice(0, 3));
            } else {
              throw new Error("Invalid format in N8N response");
            }
          } catch (jsonErr) {
            console.error("Error parsing JSON:", jsonErr);
            console.error("Raw response body:", raw);
          }
        } else {
          console.error("Unexpected content-type:", contentType);
          console.error("Raw:", raw);
        }
      } catch (err) {
        console.error("Error fetching prompts from N8N:", err);
      } finally {
        setFetchingPrompts(false);
      }
    };

    fetchPromptsFromN8n();
  }, [selected]);

  const fetchCredits = async () => {
    if (!selected) return;

    try {
      const res = await fetch(`/api/usage?feature=${selected}`);
      const data = await res.json();
      if (res.ok) {
        setCreditsLeft(data.remaining);
      } else {
        console.error(data.error || "Failed to fetch usage");
      }
    } catch (err) {
      console.error("Failed to load usage credits:", err);
    }
  };
  useEffect(() => {
    fetchCredits();
  }, [selected]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutputText("");

    const payload: any = {
      feature: selected,
      inputText,
      userId: user?.id,
      tone: selected === "INVESTOR_EMAIL" ? emailTone : null,
    };
    if (selected === "INVESTOR_EMAIL" && emailTone.trim() !== "") {
      payload.tone = emailTone.trim();
    }
    if (selected === "ELEVATOR_REWRITE" && pitchTone.trim() !== "") {
      payload.tone = pitchTone.trim();
    }

    const res = await fetch("/api/generate-pitch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
    } else {
      setOutputText(data.outputText);
      fetchCredits();
    }

    setLoading(false);
  }

  return (
    <section className="max-w-2xl mx-auto p-8 space-y-6 my-6">
      <h1 className="text-3xl font-bold text-white text-center">
        Pitch AI Tools
      </h1>

      <div className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {FEATURES.find((f) => f.key === selected)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {FEATURES.map((f) => (
              <DropdownMenuItem key={f.key} onSelect={() => setSelected(f.key)}>
                {f.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {creditsLeft !== null && (
        <p className="text-sm text-gray-300 mt-2 text-center">
          <span className="border-2 rounded-md p-2">
            You have <span className="font-bold text-white">{creditsLeft}</span>{" "}
            credits left for this tool.
          </span>
        </p>
      )}
      {selected === "INVESTOR_EMAIL" && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-white">
            AI-Suggested Prompts
          </h2>
          {fetchingPrompts ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {samplePrompts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setInputText(item.prompt)}
                  className="bg-gray-300 border p-4 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 transition text-sm"
                >
                  <h3 className="font-medium mb-1">Prompt {item.id}</h3>
                  <p className="text-gray-700">{item.prompt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-white">
        {selected === "INVESTOR_EMAIL" && (
          <div>
            <label className="block text-sm font-semibold mb-1">
              Tone of Email
            </label>
            <Input
              type="text"
              placeholder="e.g. formal, friendly, persuasive"
              value={emailTone}
              onChange={(e) => setEmailTone(e.target.value)}
              required
            />
          </div>
        )}

        {selected === "ELEVATOR_REWRITE" && (
          <div>
            <label className="block text-sm font-semibold mb-1">
              Pitch Tone
            </label>
            <Input
              type="text"
              placeholder="e.g. bold, concise, investor-focused"
              value={pitchTone}
              onChange={(e) => setPitchTone(e.target.value)}
              required
            />
          </div>
        )}

        <label className="block text-sm font-semibold">
          {selected === "ELEVATOR_REWRITE"
            ? "Startup Description"
            : "Your Prompt"}
        </label>

        <Textarea
          required
          rows={6}
          value={inputText}
          className="h-[250px]"
          onChange={(e) => setInputText(e.target.value)}
        />

        {selected === "INVESTOR_EMAIL" && (
          <Button
            type="submit"
            variant="secondary"
            className="w-full max-w-1/2"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get your email"}
          </Button>
        )}

        {selected === "ELEVATOR_REWRITE" && (
          <Button
            type="submit"
            variant="secondary"
            className="w-full max-w-1/2"
            disabled={loading}
          >
            {loading ? "Generating..." : "Get your 30s Pitch"}
          </Button>
        )}

        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <></>
        )}
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {outputText ? (
        <div>
          <h2 className="font-semibold mt-4 text-white">AI Output:</h2>
          <div className="bg-gray-800 p-4 rounded text-white whitespace-pre-wrap mt-4">
            {outputText}
          </div>
        </div>
      ) : null}
    </section>
  );
}
