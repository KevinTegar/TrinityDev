"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  SplitText,
  EASE,
  MOTION_OK,
  INTRO_DONE_EVENT,
  INTRO_SEEN_KEY,
} from "@/lib/motion";
import { SITE } from "@/data/site";

export default function Hero() {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const h1 = scope.querySelector("h1");
      const meta = scope.querySelectorAll("[data-hero-meta]");
      if (!h1) return;

      let split: SplitText | null = null;
      let cancelled = false;
      let play: (() => void) | null = null;

      gsap.set(meta, { opacity: 0, y: 12 });

      // Camera pull-away: hero shrinks and dims as it leaves the viewport.
      const scaleOut = gsap.to(h1, {
        scale: 0.92,
        yPercent: 10,
        opacity: 0.3,
        transformOrigin: "left bottom",
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
      });

      // Split after fonts load so line masks match final metrics.
      document.fonts.ready.then(() => {
        if (cancelled) return;
        split = new SplitText(h1, { type: "lines,chars", mask: "lines" });
        gsap.set(split.chars, { yPercent: 120, rotation: 5 });

        play = () => {
          gsap
            .timeline()
            .to(split!.chars, {
              yPercent: 0,
              rotation: 0,
              duration: 1.0,
              ease: EASE.out,
              stagger: { each: 0.016, from: "start" },
            })
            .to(meta, { opacity: 1, y: 0, duration: 0.7, ease: EASE.soft, stagger: 0.08 }, "-=0.55");
        };

        // Preloader sets the session key before dispatching, so a late
        // fonts.ready never strands the hero in its hidden state.
        if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1") {
          play();
        } else {
          window.addEventListener(INTRO_DONE_EVENT, play, { once: true });
        }
      });

      return () => {
        cancelled = true;
        if (play) window.removeEventListener(INTRO_DONE_EVENT, play);
        scaleOut.scrollTrigger?.kill();
        scaleOut.kill();
        split?.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scopeRef}
      data-world="ink"
      className="relative flex min-h-svh flex-col justify-end px-4 pb-8 md:px-10 md:pb-12"
    >
      <h1 className="font-display text-display-2xl font-medium uppercase">
        <span className="block">We build</span>
        <span className="block">digital experiences</span>
        <span className="block">
          that <em className="font-serif normal-case italic text-vermilion">refuse</em> to blend in
        </span>
      </h1>
      <div className="mt-10 flex items-end justify-between gap-6 border-t hairline pt-5">
        <p data-hero-meta className="font-mono text-meta uppercase">
          ( Scroll )
        </p>
        <p data-hero-meta className="hidden font-mono text-meta uppercase sm:block">
          Independent web studio
        </p>
        <p data-hero-meta className="font-mono text-meta uppercase">
          {SITE.location} — {SITE.coords}
        </p>
      </div>
    </section>
  );
}
