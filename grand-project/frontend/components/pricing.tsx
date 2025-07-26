import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center text-white">
          <h1 className="text-center text-4xl font-semibold lg:text-5xl">
            Pricing that Scales with You
          </h1>
          <p>
            Whether you're just exploring or scaling your startup, get the AI
            tools you need to craft standout pitches, emails, and investor-ready
            summaries. Start free — upgrade for speed, scale, and smarter
            collaboration.
          </p>
        </div>

        <div className="mt-8 grid gap-6 [--color-card:var(--color-muted)] *:border-none *:shadow-none md:mt-20 md:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
          <Card className="bg-gray-300 flex flex-col">
            <CardHeader>
              <CardTitle className="font-medium">Free</CardTitle>
              <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
              <CardDescription className="text-sm">Per User</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Save and View Pitches",
                  "Pitch Summarizer (3 uses/month)",
                  "Investor Email Draft Assistant (3 uses/month)",
                  "Pitch Feedback Analyzer (3 uses/month)",
                  "Elevator Pitch Rewriter (3 uses/month)",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/signup">Sign up Now</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-300 relative">
            <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
              Popular
            </span>

            <div className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-medium">Pro (Launching Soon)</CardTitle>
                <span className="my-3 block text-2xl font-semibold">
                  $19 / mo
                </span>
                <CardDescription className="text-sm">Per User</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <hr className="border-dashed" />
                <ul className="list-outside space-y-3 text-sm">
                  {[
                    "Everything in Free Plan",
                    "Email and Chat Support",
                    "Pitch Summaries (Unlimited)",
                    "Investor Email Draft Assistant (Unlimited)",
                    "AI Writing Styles (Choose from 3 styles)",
                    
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href="">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-300 flex flex-col">
            <CardHeader>
              <CardTitle className="font-medium">Startup (Launching Soon)</CardTitle>
              <span className="my-3 block text-2xl font-semibold">
                $29 / mo
              </span>
              <CardDescription className="text-sm">Per User</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {[
                  "Everything in Pro Plan",
                  "Investor Email Draft Assistant (Unlimited + Email Templates)",
                  "Pitch Analytics Dashboard (coming soon)",
                  "Export Options (PDF, Markdown, Email, Airtable)",
                  "Priority Support (Email + Live)",
                  "Choose from Multiple AI Models (Coming soon)",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="size-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link href="">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
