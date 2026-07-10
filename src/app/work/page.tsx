import type { Metadata } from "next";
import { projects } from "@/data/projects";
import WorkList from "@/components/work/WorkList";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Self-initiated concept projects by TrinityDev — production-grade builds while our client roster grows.",
};

export default function WorkPage() {
  return (
    <>
      <section data-world="ink" className="flex min-h-[60svh] flex-col justify-end px-4 pb-10 md:px-10">
        <p className="font-mono text-meta uppercase">
          (Work) — Self-initiated · {String(projects.length).padStart(2, "0")} projects
        </p>
        <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">
          Concept <em className="font-serif normal-case italic text-vermilion">work</em>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
          Concept projects while our client roster grows. Every build is held to production
          standards — performance, accessibility, and craft included.
        </p>
      </section>
      <section data-world="paper" className="px-4 py-24 md:px-10 md:py-32">
        <WorkList projects={projects} />
      </section>
    </>
  );
}
