"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const categories = ["All", "Web", "Mobile", "Design", "Marketing"];

export default function WorkPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="pt-24 pb-32 bg-background-base min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent-tertiary uppercase tracking-widest">
            Portfolio
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary mt-2">
            Our Work
          </h1>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            A selection of projects we've delivered for clients across industries.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-200 ${
                active === cat
                  ? "bg-accent-primary text-background-base font-semibold"
                  : "bg-background-secondary text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="glass-card overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background-base/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="btn-glow px-6 py-2 text-sm">View Case Study</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-xs font-mono text-accent-primary">{project.category}</span>
                    <h2 className="text-xl font-display font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-text-secondary">{project.description}</p>
                    {project.metrics && (
                      <div className="flex gap-4 pt-2">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="text-sm font-bold text-accent-primary">{m.value}</div>
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
        </div>
      </div>
    </div>
  );
}