"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { lenisStore } from "@/lib/motion/lenis-store";
import { scrollVelocity } from "@/lib/motion/velocity";

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.12 });
    lenisStore.current = lenis;
    lenis.on("scroll", (instance: Lenis) => {
      scrollVelocity.current = instance.velocity;
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisStore.current = null;
      scrollVelocity.current = 0;
    };
  }, []);

  return null;
}
