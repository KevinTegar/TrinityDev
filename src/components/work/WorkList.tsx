"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { TransitionLink } from "@/components/global/PageTransition";
import { gsap, MOTION_OK, POINTER_FINE } from "@/lib/motion";

export default function WorkList({ projects }: { projects: Project[] }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${POINTER_FINE}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX - 144);
        yTo(e.clientY - 108);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        autoAlpha: preview ? 1 : 0,
        scale: preview ? 1 : 0.92,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [preview]);

  return (
    <div>
      <ul onMouseLeave={() => setPreview(null)}>
        {projects.map((project, i) => (
          <li key={project.slug} className="border-t hairline last:border-b">
            <TransitionLink
              href={`/work/${project.slug}`}
              data-cursor="view"
              onMouseEnter={() => setPreview(project.cover)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-6 md:grid-cols-[3.5rem_1fr_auto_5rem] md:gap-8 md:py-8"
            >
              <span className="font-mono text-meta">({String(i + 1).padStart(2, "0")})</span>
              <span className="font-display text-display-lg font-medium uppercase leading-none transition-transform duration-500 ease-out group-hover:translate-x-2">
                {project.title}
                <span className="ml-3 hidden rounded-full border border-current px-2 py-0.5 align-middle font-mono text-meta uppercase md:inline-block">
                  Concept
                </span>
              </span>
              <span className="font-mono text-meta uppercase">{project.category}</span>
              <span className="hidden text-right font-mono text-meta md:block">{project.year}</span>
            </TransitionLink>
          </li>
        ))}
      </ul>
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden aspect-[4/3] w-72 overflow-hidden opacity-0 md:block"
      >
        {preview && (
          <Image src={preview} alt="" fill sizes="288px" className="object-cover" />
        )}
      </div>
    </div>
  );
}
