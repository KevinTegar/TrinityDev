"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, MOTION_OK } from "@/lib/motion";
import TrinityMark from "@/components/home/TrinityMark";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const el = textRef.current;
    if (!section || !el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Pinned typing scene: the paragraph starts empty and is "typed"
      // character by character as you scroll through the pin.
      const split = new SplitText(el, { type: "words,chars" });
      gsap.set(split.chars, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: true,
        },
      });
      tl.to(split.chars, { autoAlpha: 1, duration: 0.02, stagger: 0.06, ease: "none" });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        split.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-world="paper"
      className="flex min-h-svh flex-col justify-center px-4 py-28 md:px-10"
    >
      <p className="font-mono text-meta uppercase">(01) — Manifesto</p>
      <div className="mt-8 grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
        <p ref={textRef} className="max-w-4xl font-display text-display-lg font-medium">
          TrinityDev is an independent web studio from Jakarta. Three disciplines — strategy,
          design, engineering — one obsession: work that outperforms its category. No templates.
          No bloat. Just craft.
        </p>
        <div className="hidden md:block">
          <TrinityMark className="mx-auto w-full max-w-[24rem]" />
        </div>
      </div>
    </section>
  );
}
