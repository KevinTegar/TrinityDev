"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, MOTION_OK, POINTER_FINE } from "@/lib/motion";
import { scrollVelocity } from "@/lib/motion/velocity";

/**
 * Skews every [data-skew] element with the current scroll velocity —
 * type leans into the scroll and springs back on rest.
 */
export default function SkewOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
      const setters = gsap.utils
        .toArray<HTMLElement>("[data-skew]")
        .map((el) => gsap.quickSetter(el, "skewY", "deg"));
      if (!setters.length) return;

      let current = 0;
      const tick = () => {
        const target = gsap.utils.clamp(-6, 6, scrollVelocity.current * 0.09);
        current += (target - current) * 0.1;
        if (Math.abs(current) < 0.005 && Math.abs(target) < 0.005) {
          if (current !== 0) {
            current = 0;
            setters.forEach((set) => set(0));
          }
          return;
        }
        setters.forEach((set) => set(current));
      };

      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        setters.forEach((set) => set(0));
      };
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
