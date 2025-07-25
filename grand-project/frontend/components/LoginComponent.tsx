"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function LoginComponent() {
  const supabase = createClient();
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirectedFrom") || "/pitch";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) router.replace("/pitch");
    };
    checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/pitch` },
    });
    setMessage(error?.message ?? "Check your inbox for the magic link!");
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/pitch` },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full m-auto p-6">
      <Link href="/">
        <Image
          src="/images/elevator-pitch.png"
          width={32}
          height={32}
          alt="Logo"
        />
      </Link>
      <h1 className="mt-4 text-xl font-semibold">Sign In to PitchCraft</h1>
      <p>Welcome back! Sign in to continue</p>

      <Button
        type="button"
        variant="outline"
        className="w-full mt-6 text-muted-foreground"
        onClick={handleGoogle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="0.98em"
          height="1em"
          viewBox="0 0 256 262"
        >
          <path
            fill="#4285f4"
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          ></path>
          <path
            fill="#34a853"
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          ></path>
          <path
            fill="#fbbc05"
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
          ></path>
          <path
            fill="#eb4335"
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          ></path>
        </svg>
        <span>Google</span>
      </Button>

      <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <hr className="border-dashed" />
        <span className="text-muted-foreground text-xs">
          Or continue with email
        </span>
        <hr className="border-dashed" />
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm block">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Send Magic Link
        </Button>
      </div>

      {message && (
        <p className="mt-4 text-sm text-center text-green-600">{message}</p>
      )}

      <p className="text-center text-sm mt-6 text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-muted-foreground hover:underline hover:text-secondary"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
