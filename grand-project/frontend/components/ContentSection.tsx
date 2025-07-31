import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import SpotlightCard from "./SpotlightCard/SpotlightCard";
import AnimatedContent from "./animations/AnimatedContent/AnimatedContent";
import Image from "next/image";
import MagicBento from "./MagicBento/MagicBento";

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32">
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
              Explore What You Can Do
            </h2>
            <p>
              From pitch writing to investor communication, dive deeper into the tools built to help you sharpen your messaging, connect with the right people, and pitch smarter. Each card below walks you through a key feature.
            </p>
          </div>
          <div className="w-full mx-auto max-w-4xl md:space-y-12 p-4">
              <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
              />
            </div>

          
        </div>
      </AnimatedContent>
    </section>
  );
}
