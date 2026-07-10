"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, MOTION_OK } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  parallax?: number;
  /** Cinematic entrance: image scrubs from 1.3× down to rest while scrolling into view. */
  scrubZoom?: boolean;
};

export default function ImageReveal({ children, className, parallax = 0, scrubZoom = false }: Props) {
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
      const tweens: gsap.core.Tween[] = [];

      const clip = gsap.fromTo(
        outer,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: EASE.inOut,
          scrollTrigger: { trigger: outer, start: "top 85%", once: true },
        }
      );
      tweens.push(clip);

      if (scrubZoom) {
        tweens.push(
          gsap.fromTo(
            inner,
            { scale: 1.3 },
            {
              scale: restScale,
              ease: "none",
              scrollTrigger: { trigger: outer, start: "top 95%", end: "top 15%", scrub: true },
            }
          )
        );
      } else {
        tweens.push(
          gsap.fromTo(
            inner,
            { scale: 1.15 },
            {
              scale: restScale,
              duration: 1.1,
              ease: EASE.inOut,
              scrollTrigger: { trigger: outer, start: "top 85%", once: true },
            }
          )
        );
      }

      if (parallax > 0) {
        tweens.push(
          gsap.fromTo(
            inner,
            { yPercent: -parallax },
            {
              yPercent: parallax,
              ease: "none",
              scrollTrigger: {
                trigger: outer,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          )
        );
      }

      return () => {
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    });

    return () => mm.revert();
  }, [parallax, scrubZoom]);

  return (
    <div ref={outerRef} className={cn("relative overflow-hidden", className)}>
      <div ref={innerRef} className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}
