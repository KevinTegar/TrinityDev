"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, MOTION_OK } from "@/lib/motion";

export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const split = new SplitText(el, { type: "words" });
      gsap.set(split.words, { opacity: 0.12 });
      const tween = gsap.to(split.words, {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 45%",
          scrub: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section data-world="paper" className="px-4 py-28 md:px-10 md:py-44">
      <p className="font-mono text-meta uppercase">(01) — Manifesto</p>
      <p ref={textRef} className="mt-8 max-w-4xl font-display text-display-lg font-medium">
        TrinityDev is an independent web studio from Jakarta. Three disciplines — strategy,
        design, engineering — one obsession: work that outperforms its category. No templates.
        No bloat. Just craft.
      </p>
    </section>
  );
}
