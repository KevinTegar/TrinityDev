"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";

const headline = "We Build Digital Products That Matter";
const characters = headline.split("");

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        {/* Headline with character-by-character reveal */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 overflow-hidden">
            {characters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="inline-block"
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          TrinityDev is a web development agency in Jakarta helping startups and
          established brands build exceptional digital experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/work" className="btn-glow px-8 py-3 text-base flex items-center gap-2">
            View Our Work <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 text-base border border-border-default text-text-primary hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-300 rounded-lg flex items-center gap-2"
          >
            <MessageCircle size={16} /> Book a Call
          </Link>
        </motion.div>

        {/* Stats badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {[
            "100+ Projects",
            "5+ Years",
            "50+ Clients",
            "Jakarta, ID",
          ].map((badge) => (
            <span
              key={badge}
              className="px-4 py-1.5 bg-background-secondary border border-border-default rounded-full text-sm text-text-secondary font-mono"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-tertiary"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}