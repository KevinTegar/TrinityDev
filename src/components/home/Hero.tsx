"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, MOTION_OK, INTRO_DONE_EVENT, INTRO_SEEN_KEY } from "@/lib/motion";
import { SITE } from "@/data/site";

export default function Hero() {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const lines = scope.querySelectorAll("[data-hero-line]");
      const meta = scope.querySelectorAll("[data-hero-meta]");
      gsap.set(lines, { yPercent: 110 });
      gsap.set(meta, { opacity: 0, y: 12 });

      const play = () => {
        gsap
          .timeline()
          .to(lines, { yPercent: 0, duration: 1.1, ease: EASE.out, stagger: 0.09 })
          .to(meta, { opacity: 1, y: 0, duration: 0.7, ease: EASE.soft, stagger: 0.08 }, "-=0.5");
      };

      if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1") {
        play();
      } else {
        window.addEventListener(INTRO_DONE_EVENT, play, { once: true });
      }
      return () => window.removeEventListener(INTRO_DONE_EVENT, play);
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
        <span className="block overflow-hidden">
          <span data-hero-line className="block">
            We build
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-hero-line className="block">
            digital experiences
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-hero-line className="block">
            that <em className="font-serif normal-case italic text-vermilion">refuse</em> to blend in
          </span>
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
