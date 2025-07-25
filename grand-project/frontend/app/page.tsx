import HeroSection from "@/components/hero-section";
import Image from "next/image";
import Link from "next/link";
import ContentSection from "@/components/ContentSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PitchCraft | Home",
  description:
    "an AI powered Pitch Writer Application for founders and university students",
  keywords: [
    "Next.js 15",
    "AI web app",
    "Lenis scroll",
    "ShadCN UI",
    "Aurora background",
    "React animations",
    "developer tools",
    "founder tools",
    "smooth scrolling website",
    "modern UI components",
    "frontend development",
    "Tech startup tools",
    "Web design inspiration",
  ],
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ContentSection />
    </div>
  );
}
