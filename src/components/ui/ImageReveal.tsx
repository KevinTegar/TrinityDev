"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, MOTION_OK } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  parallax?: number;
};

export default function ImageReveal({ children, className, parallax = 0 }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Resting scale stays >1 when drifting so the parallax never exposes edges.
    const restScale = parallax > 0 ? 1.08 : 1;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const reveal = gsap.timeline({
        scrollTrigger: { trigger: outer, start: "top 85%", once: true },
      });
      reveal
        .fromTo(
          outer,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.inOut }
        )
        .fromTo(inner, { scale: 1.15 }, { scale: restScale, duration: 1.1, ease: EASE.inOut }, 0);

      let drift: gsap.core.Tween | undefined;
      if (parallax > 0) {
        drift = gsap.fromTo(
          inner,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: outer, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
      return () => {
        reveal.scrollTrigger?.kill();
        reveal.kill();
        drift?.scrollTrigger?.kill();
        drift?.kill();
      };
    });

    return () => mm.revert();
  }, [parallax]);

  return (
    <div ref={outerRef} className={cn("relative overflow-hidden", className)}>
      <div ref={innerRef} className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
