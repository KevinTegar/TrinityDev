import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.description };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="pt-24 pb-32 bg-background-base min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-base via-background-base/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12">
          <span className="text-xs font-mono text-accent-primary">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text-primary mt-2">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {/* Metrics */}
        {project.metrics && (
          <div className="glass-card p-8 grid grid-cols-3 gap-6 mb-12">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-3xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {m.value}
                </div>
                <div className="text-xs font-mono text-text-tertiary mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic case study content */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-display font-bold text-text-primary mb-3">
              The Challenge
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {project.challenge ?? project.description}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-text-primary mb-3">
              Our Approach
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {project.approach ??
                "We started with deep research into the client's users and business goals, then architected a solution that balanced performance, scalability, and exceptional user experience. Every decision was backed by data and validated through prototyping."}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-text-primary mb-3">
              The Solution
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {project.solution ??
                "The final product delivered measurable results across all key metrics, exceeding the client's expectations and establishing a new standard for their industry."}
            </p>
          </div>
        </div>

        {/* Next project */}
        <div className="mt-16 pt-12 border-t border-border-default">
          <p className="text-xs font-mono text-text-tertiary mb-4 uppercase tracking-widest">
            Next Project
          </p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="glass-card p-6 flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-mono text-accent-primary">
                {nextProject.category}
              </span>
              <h3 className="text-xl font-display font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                {nextProject.title}
              </h3>
            </div>
            <ArrowRight
              size={20}
              className="text-text-tertiary group-hover:text-accent-primary transition-colors"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
