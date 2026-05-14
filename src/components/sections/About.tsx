"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { fadeUp, staggerContainer } from "@/lib/animations/framerVariants";

const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 20, suffix: "+", label: "Technologies Mastered" },
];

const milestones = [
  { year: "2020", event: "Founded in Jakarta" },
  { year: "2021", event: "First enterprise client" },
  { year: "2022", event: "Expanded to mobile dev" },
  { year: "2023", event: "50+ projects milestone" },
  { year: "2024", event: "SEO & marketing services" },
];

function StatCounter({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCounterAnimation(value, 2000, inView);
  return (
    <div className="text-center p-6">
      <div className="text-4xl font-display font-bold text-text-primary mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-text-secondary font-mono">{label}</div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.2);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <span className="text-xs font-mono text-accent-primary uppercase tracking-widest">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary">
              Building digital products since 2020
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                TrinityDev started as a two-person team with a shared vision: to build
                digital products that don't just function — they delight. Based in
                Jakarta, we've grown into a full-service web development agency serving
                startups and established brands across Indonesia.
              </p>
              <p>
                We believe great software is a blend of engineering excellence and
                thoughtful design. Every line of code we write serves a purpose. Every
                pixel we place earns its place. We don't just meet deadlines — we
                exceed expectations.
              </p>
            </div>
          </motion.div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-4">
                <StatCounter {...stat} inView={inView} />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20"
        >
          <h3 className="text-xl font-display font-semibold text-text-primary mb-8 text-center">
            Our Journey
          </h3>
          <div className="relative flex items-center overflow-x-auto pb-4">
            {/* Timeline line */}
            <div className="absolute top-4 left-0 right-0 h-[1px] bg-border-default" />
            <div className="relative flex gap-8 min-w-max mx-auto px-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  variants={fadeUp}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-3 h-3 bg-accent-primary rounded-full relative z-10 shadow-glow" />
                  <span className="text-xs font-mono text-accent-primary">{m.year}</span>
                  <span className="text-sm text-text-secondary text-center whitespace-nowrap">
                    {m.event}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}