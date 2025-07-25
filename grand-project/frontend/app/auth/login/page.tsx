import AnimatedContent from "@/components/animations/AnimatedContent/AnimatedContent";
import LoginComponent from "@/components/LoginComponent";
export default function LoginPage() {
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
      <section className="flex min-h-screen bg-dark px-4 py-16 md:py-32 dark:bg-transparent text-white">
      <LoginComponent/>
    </section>
    </AnimatedContent>
  );
}
