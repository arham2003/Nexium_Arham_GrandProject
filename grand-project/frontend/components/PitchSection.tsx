"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useOneTimeToast } from "@/components/ToastNotification";

export default function PitchSection() {
  const supabase = createClient();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user && user.email) {
        const nameFromEmail = user.email.split("@")[0];
        setUserName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
      }
    };

    getUser();
  }, []);

  useOneTimeToast("pitch-toast-welcome", `Welcome back ${userName}!`);

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
    </div>
  );
}
