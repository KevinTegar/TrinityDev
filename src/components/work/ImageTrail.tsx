"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, POINTER_FINE } from "@/lib/motion";

const POOL_SIZE = 10;
const SPAWN_DISTANCE = 110;

type Props = {
  /** Cover URL of the hovered project, or null when nothing is hovered. */
  src: string | null;
  /** All cover URLs — warmed into the browser cache on mount. */
  sources: string[];
};

/**
 * Awwwards-style image trail: while a work row is hovered, cover images
 * spawn along the cursor path, pop in and dissolve away.
 */
export default function ImageTrail({ src, sources }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const srcRef = useRef<string | null>(src);
  srcRef.current = src;

  useEffect(() => {
    sources.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, [sources]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${POINTER_FINE} and (min-width: 768px)`, () => {
      const items = Array.from(host.children) as HTMLElement[];
      gsap.set(items, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      let last = { x: -9999, y: -9999 };
      let index = 0;
      let z = 0;

      const spawn = (x: number, y: number, url: string) => {
        const el = items[index % POOL_SIZE];
        index += 1;
        z += 1;
        const img = el.querySelector("img");
        if (img && img.getAttribute("src") !== url) img.setAttribute("src", url);

        gsap.killTweensOf(el);
        gsap
          .timeline()
          .set(el, { x, y, zIndex: z, rotation: gsap.utils.random(-7, 7) })
          .fromTo(
            el,
            { autoAlpha: 0, scale: 0.65 },
            { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" }
          )
          .to(el, { autoAlpha: 0, scale: 1.05, y: y - 36, duration: 0.5, ease: "power2.in" }, "+=0.12");
      };

      const onMove = (e: PointerEvent) => {
        const url = srcRef.current;
        if (!url) return;
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        if (dx * dx + dy * dy < SPAWN_DISTANCE * SPAWN_DISTANCE) return;
        last = { x: e.clientX, y: e.clientY };
        spawn(e.clientX, e.clientY, url);
      };

      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 hidden md:block">
      {Array.from({ length: POOL_SIZE }).map((_, i) => (
        <div key={i} className="absolute left-0 top-0 aspect-[4/3] w-60 overflow-hidden opacity-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}
