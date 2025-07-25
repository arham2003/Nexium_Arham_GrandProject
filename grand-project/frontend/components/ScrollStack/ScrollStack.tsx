"use client";
import React, { ReactNode, useLayoutEffect, useRef, useCallback } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const parsePercentage = useCallback((value: string | number, height: number) => {
    return typeof value === "string" && value.includes("%")
      ? (parseFloat(value) / 100) * height
      : parseFloat(value as string);
  }, []);

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    []
  );

  const updateCardTransforms = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || isUpdatingRef.current || !cardsRef.current.length) return;

    isUpdatingRef.current = true;
    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPx = parsePercentage(scaleEndPosition, containerHeight);
    const endEl = scroller.querySelector(".scroll-stack-end") as HTMLElement;
    const endTop = endEl?.offsetTop || 0;

    cardsRef.current.forEach((card, i) => {
      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;
      const pinStart = triggerStart;
      const pinEnd = endTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const scale = 1 - scaleProgress * (1 - (baseScale + i * itemScale));
      const rotation = i * rotationAmount * scaleProgress;

      let blur = 0;
      if (blurAmount) {
        let topCard = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          if (scrollTop >= cardsRef.current[j].offsetTop - stackPx - itemStackDistance * j) {
            topCard = j;
          }
        }
        if (i < topCard) {
          blur = Math.max(0, (topCard - i) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const prev = lastTransformsRef.current.get(i);
      const changed =
        !prev ||
        Math.abs(prev.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(prev.scale - newTransform.scale) > 0.001 ||
        Math.abs(prev.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(prev.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!inView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    stackPosition,
    scaleEndPosition,
    baseScale,
    itemScale,
    itemStackDistance,
    rotationAmount,
    blurAmount,
    parsePercentage,
    calculateProgress,
    onStackComplete,
  ]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    cardsRef.current = Array.from(
      scroller.querySelectorAll(".scroll-stack-card")
    ) as HTMLElement[];

    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
    });

    const onScroll = () => {
      requestAnimationFrame(updateCardTransforms);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    updateCardTransforms();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      lastTransformsRef.current.clear();
      cardsRef.current = [];
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    updateCardTransforms,
  ]);

  return (
    <div
      ref={scrollerRef}
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`}
      style={{
        overscrollBehavior: "contain",
        scrollBehavior: "smooth",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
