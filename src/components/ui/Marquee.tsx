"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/motion";
import { scrollVelocity } from "@/lib/motion/velocity";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  /** Base loop speed multiplier — 1 loops in ~22s. */
  speed?: number;
  className?: string;
};

/**
 * Velocity-reactive marquee: scrolling down speeds it up,
 * scrolling up reverses it, at rest it drifts at base speed.
 */
export default function Marquee({ children, speed = 1, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const loop = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 22 / speed,
        repeat: -1,
      });

      const tick = () => {
        const target = gsap.utils.clamp(-4, 4, 1 + scrollVelocity.current * 0.05);
        loop.timeScale(gsap.utils.interpolate(loop.timeScale(), target, 0.08));
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        loop.kill();
      };
    });

    return () => mm.revert();
  }, [speed]);

  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <div ref={trackRef} className="flex shrink-0 items-center">
        <span className="flex items-center">{children}</span>
        <span className="flex items-center" aria-hidden="true">
          {children}
        </span>
      </div>
    </div>
  );
}
