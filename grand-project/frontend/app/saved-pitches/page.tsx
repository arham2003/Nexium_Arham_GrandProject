import AnimatedContent from "@/components/animations/AnimatedContent/AnimatedContent";
import SavedPitches from "@/components/SavedPitches";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PitchCraft | Saved Pitches",
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

export default function SavedPitchesPage() {
  return (
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
      <section className="max-w-6xl mx-auto p-6 py-16 md:py-32">
        <h1 className="text-2xl font-semibold mb-6 text-white text-center">
          Saved Pitches
        </h1>
        <SavedPitches />
      </section>
    </AnimatedContent>
  );
}
