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
    <div>
      <PitchPage />
    </div>
  );
}
