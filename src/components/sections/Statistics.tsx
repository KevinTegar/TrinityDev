"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { fadeUp, staggerContainer } from "@/lib/animations/framerVariants";

const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years in Business" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

function Counter({ value, suffix, label, inView }: { value: number; suffix: string; label: string; inView: boolean }) {
  const count = useCounterAnimation(value, 2000, inView);
  return (
    <div className="text-center p-6">
      <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-sm text-text-secondary mt-2 font-mono">{label}</div>
    </div>
  );
}

export default function Statistics() {
  const { ref, inView } = useInView(0.3);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-base">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="glass-card p-12 relative overflow-hidden"
          style={{
            boxShadow: "0 0 60px rgba(96, 165, 250, 0.08)",
          }}
        >
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-secondary/5 rounded-full blur-3xl" />

          <motion.div variants={fadeUp} className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Counter key={stat.label} {...stat} inView={inView} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}