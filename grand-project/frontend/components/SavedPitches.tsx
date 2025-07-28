"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/utils/supabase/client";
import Loader from "./Loader";

export default function SavedPitches() {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchPitches = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("User not authenticated", error);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/pitches?userId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log("Fetched pitches:", data);
        setPitches(data);
      } catch (err) {
        console.error("Failed to fetch pitches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, []);

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          pitches.map((pitch) => (
            <Card
              key={pitch.id}
              className="bg-gray-900 text-white border border-gray-700"
            >
              <CardContent className="p-4 space-y-4">
                <div className="text-sm text-gray-400 capitalize">
                  {pitch.featureType === "ELEVATOR_REWRITE"
                    ? "Elevator Pitch"
                    : "Investor Email"}
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Input</div>
                  <p className="text-white line-clamp-10 whitespace-pre-wrap text-sm">
                    {pitch.input}
                  </p>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Output</div>
                  <p className="text-white line-clamp-10 whitespace-pre-wrap text-sm">
                    {pitch.output}
                  </p>
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  saved{" "}
                  {formatDistanceToNow(new Date(pitch.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
