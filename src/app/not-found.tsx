import { TransitionLink } from "@/components/global/PageTransition";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export default function NotFound() {
  return (
    <section
      data-world="ink"
      className="flex min-h-svh flex-col items-start justify-end px-4 pb-12 md:px-10"
    >
      <p className="font-mono text-meta uppercase">(404) — Lost</p>
      <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">
        Nothing <em className="font-serif normal-case italic text-vermilion">here</em>
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed opacity-80">
        This page doesn&apos;t exist — or hasn&apos;t been built yet.
      </p>
      <TransitionLink href="/" className={cn("mt-8 font-mono text-meta uppercase", underline)}>
        Back home ↗
      </TransitionLink>
    </section>
  );
}
