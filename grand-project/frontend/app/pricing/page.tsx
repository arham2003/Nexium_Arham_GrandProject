import Pricing from "@/components/pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PitchCraft | Pricing",
  description:
    "an AI powered Pitch Writer Application for founders and university students, Enroll for Subscription today!",
  keywords: [
    "Next.js 15",
    "subscription",
    "AI web app",
    "Lenis scroll",
    "ShadCN UI",
    "Aurora background",
    "React animations",
    "developer tools",
    "founder tools",
    "smooth scrolling website",
    "modern UI components",
    "Tech startup tools",
    "Web design inspiration",
  ],
};

export default function PricingPage() {
  return (
    <div>
      <Pricing />
    </div>
  );
}
