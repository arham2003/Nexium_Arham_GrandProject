import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ShinyText from "./TextAnimations/ShinyText/ShinyText";
import RotatingText from "./TextAnimations/RotatingText/RotatingText";
import Carousel from "./Carousel/Carousel";
import AnimatedContent from "./animations/AnimatedContent/AnimatedContent";

const menuItems = [
  { name: "Features", href: "#" },
  { name: "Solution", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About", href: "#" },
];

export default function HeroSection() {
  return (
    <>
      <br />
      <section
        className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0 mt-5"
        id="Home"
      >
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
          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex px-4 py-2 border bg-transparent border-gray-200 rounded-full">
                <ShinyText
                  text="Made by Developers, for Founders"
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
              </span>
              <h2 className="mt-5 text-4xl font-bold leading-tight text-white  sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
                Craft Investor-Winning Pitches with AI Precision
              </h2>
              <p className="mt-5 text-lg font-bold leading-tight  text-white sm:text-lg sm:leading-tight lg:text-xl lg:leading-tight font-pj">
                Your go-to tool for{" "}
                <span className="inline-block pt-2">
                  <RotatingText
                    texts={[
                      "writing winning investor pitches!",
                      "crafting powerful startup decks!",
                      "automating pitch content with AI!",
                      "turning ideas into funding stories!",
                    ]}
                    mainClassName="inline-flex bg-[#4DBCA2] text-black px-2 py-1 rounded-lg"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3000}
                  />
                </span>
              </p>

              <div className="relative inline-flex mt-10 group">
                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

                <Link
                  href="/pitch"
                  title=""
                  className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-800 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Start Writing
                </Link>
              </div>
              <div className="mt-10 flex justify-center w-full ">
                <Carousel
                  baseWidth={300}
                  autoplay={true}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  loop={true}
                  round={false}
                />
              </div>
            </div>
          </div>
        </AnimatedContent>
      </section>
    </>
  );
}
