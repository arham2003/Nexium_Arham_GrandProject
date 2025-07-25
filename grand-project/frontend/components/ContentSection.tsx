import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import SpotlightCard from "./SpotlightCard/SpotlightCard";
import AnimatedContent from "./animations/AnimatedContent/AnimatedContent";
import Image from "next/image";

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32" id="Features">
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={true}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0.2}
        animateOpacity
        scale={1.1}
        threshold={0.2}
        delay={0.3}
      >
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
          <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12 text-white">
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              Features That Pitch In So You Don’t Have To ⚡️
            </h2>
            <p>
              Whether you’re pitching to investors, writing your first cold
              email, or fine-tuning your startup’s one-liner — this app gives
              you the AI tools to sound sharp, clear, and confident. No fluff,
              no filler. Just focused features that actually help you pitch
              better.
            </p>
          </div>
          <Image
            className="rounded-(--radius) grayscale"
            src="/images/card.jpg"
            alt="team image"
            height={1920}
            width={1080}
            priority
          />

          <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
            <SpotlightCard
              className="custom-spotlight-card text-white"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="size-4" />
                  <h3 className="text-sm font-medium">Faaast</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  It supports an entire helping developers and innovate.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard
              className="custom-spotlight-card text-white"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="size-4" />
                  <h3 className="text-sm font-medium">Powerful</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  It supports an entire helping developers and businesses.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard
              className="custom-spotlight-card text-white"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="size-4" />
                  <h3 className="text-sm font-medium">Security</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  It supports an helping developers businesses innovate.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard
              className="custom-spotlight-card text-white"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4" />

                  <h3 className="text-sm font-medium">AI Powered</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  It supports an helping developers businesses innovate.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
