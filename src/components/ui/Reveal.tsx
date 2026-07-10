"use client";

import { createElement, useEffect, useRef } from "react";
import { gsap, EASE, DUR, MOTION_OK } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
};

export default function Reveal({ children, y = 32, delay = 0, className, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tween = gsap.from(el, {
        opacity: 0,
        y,
        duration: DUR.base,
        delay,
        ease: EASE.out,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [y, delay]);

  return createElement(as, { ref, className }, children);
}
