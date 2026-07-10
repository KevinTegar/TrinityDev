import type { Metadata } from "next";
import { studio } from "@/data/studio";
import { capabilities } from "@/data/capabilities";
import { SITE } from "@/data/site";
import { TransitionLink } from "@/components/global/PageTransition";
import Reveal from "@/components/ui/Reveal";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Studio",
  description: studio.intro,
};

export default function StudioPage() {
  return (
    <>
      <section data-world="ink" className="flex min-h-[70svh] flex-col justify-end px-4 pb-10 md:px-10">
        <p className="font-mono text-meta uppercase">(The Studio) — {SITE.location}</p>
        <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">
          Small studio. <em className="font-serif normal-case italic text-vermilion">Serious</em> craft.
        </h1>
      </section>

      <section data-world="paper" className="px-4 py-24 md:px-10 md:py-36">
        <p className="font-mono text-meta uppercase">(01) — Story</p>
        <div className="mt-8 max-w-3xl space-y-8">
          {studio.story.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)}>
              <p className="text-lg leading-relaxed md:text-xl">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section data-world="paper" className="px-4 pb-24 md:px-10 md:pb-36">
        <p className="mb-10 font-mono text-meta uppercase">(02) — What we do</p>
        {capabilities.map((cap) => (
          <Reveal
            key={cap.index}
            className="grid gap-4 border-t hairline py-10 md:grid-cols-[3.5rem_1fr_1fr] md:gap-8"
          >
            <span className="font-mono text-meta text-vermilion">{cap.index}</span>
            <div>
              <h2 className="font-display text-display-md font-medium uppercase">{cap.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">{cap.description}</p>
            </div>
            <ul className="space-y-2 self-end">
              {cap.items.map((item) => (
                <li key={item} className="border-b hairline pb-2 font-mono text-meta uppercase">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section data-world="ink" className="px-4 py-24 md:px-10 md:py-36">
        <p className="mb-10 font-mono text-meta uppercase">(03) — Principles</p>
        <div className="grid gap-x-12 md:grid-cols-2">
          {studio.principles.map((principle, i) => (
            <Reveal key={principle.title} delay={(i % 2) * 0.08} className="border-t hairline py-8">
              <h2 className="font-display text-display-md font-medium uppercase">
                <span className="mr-3 font-mono text-meta text-vermilion">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {principle.title}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80">{principle.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 border-t hairline pt-8">
          <TransitionLink
            href="/contact"
            className={cn("font-display text-display-lg font-medium uppercase", underline)}
          >
            Work with us ↗
          </TransitionLink>
        </div>
      </section>
    </>
  );
}
