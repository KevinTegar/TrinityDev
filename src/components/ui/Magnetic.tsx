"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, POINTER_FINE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

export default function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
}
