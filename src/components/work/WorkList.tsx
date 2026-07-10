"use client";

import { useState } from "react";
import type { Project } from "@/data/projects";
import { TransitionLink } from "@/components/global/PageTransition";
import ImageTrail from "@/components/work/ImageTrail";

export default function WorkList({ projects }: { projects: Project[] }) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div>
      <ul onMouseLeave={() => setPreview(null)}>
        {projects.map((project, i) => (
          <li key={project.slug} data-skew className="border-t hairline last:border-b">
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
      <ImageTrail src={preview} sources={projects.map((p) => p.cover)} />
    </div>
  );
}
