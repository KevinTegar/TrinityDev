"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, MOTION_OK } from "@/lib/motion";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const el = textRef.current;
    if (!section || !el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const split = new SplitText(el, { type: "words" });
      gsap.set(split.words, { opacity: 0.12 });

      // Pinned scene: the section locks while the paragraph lights up
      // word by word and swells slightly, then releases.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: true,
        },
      });
      tl.to(split.words, { opacity: 1, stagger: 0.06, ease: "none" }).to(
        el,
        { scale: 1.03, transformOrigin: "left center", ease: "none" },
        0
      );

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
      <p ref={textRef} className="mt-8 max-w-4xl font-display text-display-lg font-medium">
        TrinityDev is an independent web studio from Jakarta. Three disciplines — strategy,
        design, engineering — one obsession: work that outperforms its category. No templates.
        No bloat. Just craft.
      </p>
    </section>
  );
}
