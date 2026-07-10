"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_OK, POINTER_FINE } from "@/lib/motion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
      gsap.set(dot, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3.out" });
      const yTo = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const onOver = (e: Event) => {
        const target = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null;
        setLabel(target?.dataset.cursor ?? null);
      };
      const onLeaveWindow = () => gsap.to(dot, { autoAlpha: 0, duration: 0.2 });

      window.addEventListener("pointermove", onMove);
      document.addEventListener("mouseover", onOver);
      document.documentElement.addEventListener("mouseleave", onLeaveWindow);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (dotRef.current) {
      gsap.to(dotRef.current, { scale: label ? 6 : 1, duration: 0.35, ease: "power3.out" });
    }
  }, [label]);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-3 w-3 items-center justify-center rounded-full bg-paper opacity-0 mix-blend-difference md:flex"
    >
      {label && (
        <span className="font-mono text-[2.5px] uppercase tracking-widest text-ink">{label}</span>
      )}
    </div>
  );
}
