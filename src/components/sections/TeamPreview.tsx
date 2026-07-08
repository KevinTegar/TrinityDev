"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp, staggerContainer } from "@/lib/animations/framerVariants";
import { team } from "@/data/team";

export default function TeamPreview() {
  const { ref, inView } = useInView(0.15);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-base">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-accent-secondary uppercase tracking-widest">
            Team
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-2">
            Meet the Team
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {team.map((member) => (
            <motion.div key={member.id} variants={fadeUp}>
              <div className="glass-card p-6 group hover:shadow-card transition-all duration-300">
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-base font-display font-semibold text-text-primary">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-accent-primary">{member.role}</p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1 justify-center mt-2">
                    {member.specialties.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 bg-background-elevated text-[10px] font-mono text-text-tertiary rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Fun fact */}
                  <p className="text-xs text-text-tertiary mt-3 italic">
                    {member.funFact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mt-10">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors"
          >
            Meet the Full Team <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}