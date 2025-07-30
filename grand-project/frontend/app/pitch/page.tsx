import AnimatedContent from "@/components/animations/AnimatedContent/AnimatedContent";
import PitchPage from "@/components/PitchSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PitchCraft | AI Tools",
  description:
    "an AI powered Pitch Writer Application for founders and university students, Enroll for Subscription today!",
  keywords: [
    "Elevator Pitches",
    "Investor Email Draft",
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

export default function Pitch() {
  return (
    <section className="max-w-7xl mx-auto p-6 space-y-6 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-white text-center">
        Pitch AI Tools
      </h1>
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
        <PitchPage />
      </AnimatedContent>
    </section>
  );
}
