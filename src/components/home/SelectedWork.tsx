import { projects } from "@/data/projects";
import WorkList from "@/components/work/WorkList";
import { TransitionLink } from "@/components/global/PageTransition";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export default function SelectedWork() {
  return (
    <section data-world="paper" className="px-4 pb-28 md:px-10 md:pb-40">
      <div className="mb-10 flex items-end justify-between">
        <p className="font-mono text-meta uppercase">(02) — Selected work</p>
        <p className="font-mono text-meta uppercase opacity-60">
          Self-initiated concepts ({String(projects.length).padStart(2, "0")})
        </p>
      </div>
      <WorkList projects={projects} />
      <div className="mt-10 flex justify-end">
        <TransitionLink href="/work" className={cn("font-mono text-meta uppercase", underline)}>
          All work ↗
        </TransitionLink>
      </div>
    </section>
  );
}
