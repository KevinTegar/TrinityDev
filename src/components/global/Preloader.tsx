"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, EASE, INTRO_DONE_EVENT, INTRO_SEEN_KEY, prefersReducedMotion } from "@/lib/motion";
import { SITE } from "@/data/site";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      document.documentElement.style.overflow = "";
      setDone(true);
    };

    if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1" || prefersReducedMotion()) {
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(counter, {
      v: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        }
      },
    }).to(rootRef.current, { yPercent: -100, duration: 0.9, ease: EASE.inOut }, "+=0.15");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex items-end justify-between bg-ink p-6 text-paper md:p-10"
    >
      <noscript>
        <style>{`[data-preloader]{display:none}`}</style>
      </noscript>
      <span className="font-display text-display-md uppercase">
        {SITE.wordmark}
        <span className="align-super text-[0.5em]">®</span>
      </span>
      <span ref={countRef} className="font-mono text-meta">
        000
      </span>
    </div>
  );
}
