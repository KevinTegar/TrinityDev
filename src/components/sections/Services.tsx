"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Palette, Smartphone, TrendingUp, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp, staggerContainer } from "@/lib/animations/framerVariants";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={28} className="text-accent-primary" />,
  Palette: <Palette size={28} className="text-accent-primary" />,
  Smartphone: <Smartphone size={28} className="text-accent-primary" />,
  TrendingUp: <TrendingUp size={28} className="text-accent-primary" />,
};

export default function Services() {
  const { ref, inView } = useInView(0.2);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-base">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent-secondary uppercase tracking-widest">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-2">
            What We Build
          </h2>
          <div className="mt-4 mx-auto w-24 h-1 bg-gradient-primary rounded-full" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              className="glass-card p-8 cursor-pointer relative overflow-hidden group"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Glow on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent transition-opacity duration-500 ${
                  hoveredId === service.id ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="relative z-10">
                <div className="mb-4">{iconMap[service.icon]}</div>
                <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {service.shortDescription}
                </p>

                {/* Features — expand on hover */}
                <div
                  className={`space-y-2 overflow-hidden transition-all duration-300 ${
                    hoveredId === service.id ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="w-1 h-1 bg-accent-tertiary rounded-full flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                  <div className="pt-4">
                    <a
                      href="/services"
                      className="inline-flex items-center gap-1 text-sm text-accent-primary hover:gap-2 transition-all duration-200 font-mono"
                    >
                      Learn More <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}