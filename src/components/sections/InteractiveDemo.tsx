"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { fadeUp, staggerContainer } from "@/lib/animations/framerVariants";
import { ArrowRight } from "lucide-react";

const components = [
  { id: "button", label: "Animated Button", tech: "Framer Motion", color: "#60A5FA" },
  { id: "card", label: "Glassmorphism Card", tech: "CSS + Backdrop", color: "#818CF8" },
  { id: "input", label: "Form Input", tech: "React + Validation", color: "#34D399" },
  { id: "badge", label: "Stats Badge", tech: "Intersection Observer", color: "#F472B6" },
  { id: "nav", label: "Navigation Bar", tech: "Next.js + Framer", color: "#60A5FA" },
  { id: "testimonial", label: "Testimonial Card", tech: "Framer Motion", color: "#818CF8" },
];

export default function InteractiveDemo() {
  const { ref, inView } = useInView(0.2);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent-quaternary uppercase tracking-widest">
            Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-2">
            What We Can Build For You
          </h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Hover over any component to see it in action. Every element is built with
            precision and attention to detail.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {components.map((comp) => (
            <motion.div
              key={comp.id}
              variants={fadeUp}
              className="glass-card p-6 cursor-pointer flex flex-col items-center justify-center gap-4 min-h-40"
              onMouseEnter={() => setActiveId(comp.id)}
              onMouseLeave={() => setActiveId(null)}
              style={{
                boxShadow:
                  activeId === comp.id
                    ? `0 0 30px ${comp.color}20`
                    : undefined,
                borderColor:
                  activeId === comp.id
                    ? `${comp.color}50`
                    : undefined,
                transform:
                  activeId === comp.id
                    ? "scale(1.02)"
                    : "scale(1)",
                transition: "all 0.3s ease",
              }}
            >
              {/* Demo content */}
              <div className="w-full flex items-center justify-center">
                {comp.id === "button" && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 6px 30px rgba(96,165,250,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-glow px-4 py-2 text-sm"
                  >
                    Get Started
                  </motion.button>
                )}
                {comp.id === "card" && (
                  <div className="glass-card p-4 w-full max-w-[200px]">
                    <div className="text-sm text-text-primary font-medium">Glass Card</div>
                    <div className="text-xs text-text-tertiary mt-1">Hover to glow</div>
                  </div>
                )}
                {comp.id === "input" && (
                  <input
                    className="px-3 py-2 bg-background-base border border-border-default rounded text-sm text-text-primary w-full max-w-[200px] focus:outline-none focus:border-accent-primary transition-colors"
                    placeholder="Type something..."
                  />
                )}
                {comp.id === "badge" && (
                  <span className="px-3 py-1 bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-mono rounded-full">
                    100+ Projects
                  </span>
                )}
                {comp.id === "nav" && (
                  <div className="flex gap-4 w-full max-w-[200px] justify-between">
                    <span className="text-xs text-text-primary font-bold">Logo</span>
                    <div className="flex gap-2">
                      {["Work", "About"].map((l) => (
                        <span key={l} className="text-xs text-text-secondary">{l}</span>
                      ))}
                    </div>
                  </div>
                )}
                {comp.id === "testimonial" && (
                  <div className="w-full max-w-[200px] space-y-1">
                    <p className="text-xs text-text-secondary italic">"Incredible work!"</p>
                    <span className="text-xs text-accent-primary font-mono">★★★★★</span>
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="text-center">
                <div className="text-xs font-medium text-text-primary">{comp.label}</div>
                <div className="text-[10px] font-mono text-text-tertiary mt-1">{comp.tech}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            Want something like this? Let's talk. <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}