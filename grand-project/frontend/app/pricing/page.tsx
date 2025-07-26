import AnimatedContent from "@/components/animations/AnimatedContent/AnimatedContent";
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
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={false}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        <Pricing />
      </AnimatedContent>
    </div>
  );
}
