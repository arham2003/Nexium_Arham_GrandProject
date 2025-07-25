"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis>();

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.05,
      wheelMultiplier: 1.4,
      orientation: "vertical",
      gestureOrientation: "vertical",
      anchors: true,
      syncTouch: false,
      autoResize: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
