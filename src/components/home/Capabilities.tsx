"use client";

import { useEffect, useRef } from "react";
import { capabilities } from "@/data/capabilities";
import { gsap, MOTION_OK } from "@/lib/motion";

/**
 * Pinned horizontal scene on desktop: the section locks and the three
 * discipline panels slide sideways with the scroll. On mobile, touch,
 * reduced motion, or without JS it renders as a plain stacked list —
 * the horizontal styles are only applied inside the matchMedia scope.
 */
export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (min-width: 768px)`, () => {
      const panels = track.querySelectorAll("[data-caps-panel]");

      gsap.set(section, {
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        paddingBottom: 0,
      });
      gsap.set(track, {
        flexDirection: "row",
        flexWrap: "nowrap",
        flexGrow: 1,
        minHeight: 0,
      });
      gsap.set(panels, {
        width: "62vw",
        height: "100%",
        flexShrink: 0,
        borderTopWidth: 0,
        borderLeftWidth: "1px",
      });

      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} data-world="paper" className="pb-24">
      <p className="px-4 pb-8 pt-10 font-mono text-meta uppercase md:px-10">
        (03) — Capabilities
      </p>
      <div ref={trackRef} className="flex flex-col">
        {capabilities.map((cap) => (
          <article
            key={cap.index}
            data-caps-panel
            className="flex flex-col justify-between gap-10 border-t hairline px-4 py-10 md:px-10"
          >
            <div>
              <span className="font-mono text-meta text-vermilion">{cap.index}</span>
              <h3 className="mt-4 font-display text-display-xl font-medium uppercase">
                {cap.title}
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
              <p className="max-w-md text-sm leading-relaxed opacity-80">{cap.description}</p>
              <ul className="space-y-2 self-end">
                {cap.items.map((item) => (
                  <li key={item} className="border-b hairline pb-2 font-mono text-meta uppercase">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
