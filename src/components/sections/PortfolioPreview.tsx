"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp, staggerContainer } from "@/lib/animations/framerVariants";
import { projects } from "@/data/projects";

const categoryColors: Record<string, string> = {
  Web: "#60A5FA",
  Mobile: "#34D399",
  Design: "#F472B6",
  Marketing: "#818CF8",
};

export default function PortfolioPreview() {
  const { ref, inView } = useInView(0.15);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-base">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-xs font-mono text-accent-tertiary uppercase tracking-widest">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-2">
              Selected Work
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors"
          >
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div key={project.slug} variants={fadeUp}>
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="glass-card overflow-hidden">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-background-base/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="btn-glow px-6 py-2 text-sm">
                        View Case Study
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-2 py-0.5 text-[10px] font-mono rounded-full border"
                        style={{
                          color: categoryColors[project.category],
                          borderColor: `${categoryColors[project.category]}50`,
                          backgroundColor: `${categoryColors[project.category]}10`,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{project.description}</p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flex gap-4 pt-2">
                        {project.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="text-center">
                            <div className="text-sm font-display font-bold text-accent-primary">
                              {m.value}
                            </div>
                            <div className="text-[10px] font-mono text-text-tertiary">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors">
            View All Work <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}