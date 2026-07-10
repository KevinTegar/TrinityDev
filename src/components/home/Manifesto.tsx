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
      // Typewriter scene: characters snap on with zero fade, a blinking
      // vermilion caret rides the last typed character, and the scrub lag
      // lets the typing catch up after the scroll stops — that's the weight.
      const split = new SplitText(el, { type: "words,chars" });
      const chars = split.chars as HTMLElement[];
      gsap.set(chars, { autoAlpha: 0 });

      const caret = document.createElement("span");
      caret.setAttribute("aria-hidden", "true");
      caret.className = "absolute left-0 top-0";
      const caretBar = document.createElement("span");
      caretBar.className = "type-caret block h-[0.95em] w-[0.09em] min-w-[3px] bg-vermilion";
      caret.appendChild(caretBar);
      gsap.set(caret, { autoAlpha: 0 });
      el.appendChild(caret);

      const STEP = 0.06;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.7,
        },
      });

      // Binary reveals — a hard set per character, no tween, no fade.
      chars.forEach((char, i) => {
        tl.set(char, { autoAlpha: 1 }, i * STEP);
      });

      // Caret follows the most recently typed character.
      const cursor = { i: 0 };
      tl.to(
        cursor,
        {
          i: chars.length - 1,
          ease: "none",
          duration: (chars.length - 1) * STEP,
          onUpdate: () => {
            const char = chars[Math.round(cursor.i)];
            if (!char) return;
            gsap.set(caret, {
              x: char.offsetLeft + char.offsetWidth + 2,
              y: char.offsetTop,
              autoAlpha: tl.progress() < 1 && tl.progress() > 0 ? 1 : 0,
            });
          },
        },
        0
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        caret.remove();
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
        <p ref={textRef} className="relative max-w-4xl font-display text-display-lg font-medium">
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
