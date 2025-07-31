import { FeatureSteps } from "@/components/feature-section2";
import AnimatedContent from "./animations/AnimatedContent/AnimatedContent";

const features = [
  {
    step: "Step 1",
    title: "Generate Smart Pitches",
    content:
      "Turn your ideas into compelling 30-second elevator pitches using AI.",
    image: "/images/card.jpg",
  },
  {
    step: "Step 2",
    title: "Craft Investor Emails",
    content:
      "Get personalized, professional investor email drafts tailored to your tone and intent.",
    image: "/images/card2.png",
  },
  {
    step: "Step 3",
    title: "Track Your Usage",
    content:
      "Signed-up users get 5 monthly trials per feature, with more coming soon.",
    image: "/images/card3.avif",
  },
];

export function FeatureSection2() {
  return (
    <div className="py-16 md:py-32" id="Features">
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
        <FeatureSteps
          features={features}
          title="Features That Pitch In So You Don’t Have To ⚡️"
          autoPlayInterval={3000}
          imageHeight="h-[500px]"
        />
      </AnimatedContent>
    </div>
  );
}
