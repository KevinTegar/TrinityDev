import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { TransitionLink } from "@/components/global/PageTransition";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} (Concept)`,
    description: project.summary,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section data-world="ink" className="flex min-h-[70svh] flex-col justify-end px-4 pb-10 md:px-10">
        <p className="font-mono text-meta uppercase">
          (Work / {String(index + 1).padStart(2, "0")}) —{" "}
          <span className="text-vermilion">Concept project</span>
        </p>
        <h1 className="mt-4 font-display text-display-2xl font-medium uppercase">{project.title}</h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed opacity-80">{project.summary}</p>
      </section>

      <section data-world="paper" className="px-4 py-16 md:px-10 md:py-24">
        <ImageReveal className="aspect-[16/10] w-full" parallax={6} scrubZoom>
          <Image
            src={project.cover}
            alt={`${project.title} — cover visual`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>

        <dl className="mt-12 grid grid-cols-2 gap-8 border-t hairline pt-8 md:grid-cols-4">
          <div>
            <dt className="font-mono text-meta uppercase opacity-60">Role</dt>
            <dd className="mt-2 space-y-1 font-mono text-meta uppercase">
              {project.role.map((r) => (
                <p key={r}>{r}</p>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-meta uppercase opacity-60">Stack</dt>
            <dd className="mt-2 space-y-1 font-mono text-meta uppercase">
              {project.stack.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-meta uppercase opacity-60">Year</dt>
            <dd className="mt-2 font-mono text-meta uppercase">{project.year}</dd>
          </div>
          <div>
            <dt className="font-mono text-meta uppercase opacity-60">Status</dt>
            <dd className="mt-2 font-mono text-meta uppercase text-vermilion">{project.status}</dd>
          </div>
        </dl>

        {project.body.map((section, i) => (
          <Reveal key={section.heading} className="mt-20 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
            <h2 className="font-display text-display-md font-medium uppercase">
              <span className="mr-3 font-mono text-meta text-vermilion">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </h2>
            <p className="max-w-2xl leading-relaxed opacity-90">{section.text}</p>
          </Reveal>
        ))}

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {project.images.map((src, i) => (
            <ImageReveal key={src} className="aspect-[4/3]">
              <Image
                src={src}
                alt={`${project.title} — detail ${i + 1}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          ))}
        </div>
      </section>

      <section data-world="ink" className="px-4 py-24 md:px-10 md:py-32">
        <p className="font-mono text-meta uppercase opacity-60">Next project</p>
        <TransitionLink
          href={`/work/${next.slug}`}
          data-cursor="view"
          className="group mt-4 flex items-baseline justify-between border-t hairline pt-6"
        >
          <span className="font-display text-display-xl font-medium uppercase transition-transform duration-500 ease-out group-hover:translate-x-2">
            {next.title}
          </span>
          <span className="font-mono text-meta uppercase">{next.category} ↗</span>
        </TransitionLink>
      </section>
    </>
  );
}
