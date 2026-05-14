"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Rocket } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp } from "@/lib/animations/framerVariants";

export default function CTASection() {
  const { ref, inView } = useInView(0.3);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-base relative overflow-hidden">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary">
            Ready to Build Something{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Great?</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Let's discuss your project. Free consultation, no obligations. We typically
            respond within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="btn-glow px-8 py-3 text-base flex items-center gap-2"
            >
              <Rocket size={16} /> Start a Project
            </Link>
            <Link
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-base border border-border-default text-text-primary hover:border-accent-tertiary hover:bg-accent-tertiary/5 transition-all duration-300 rounded-lg flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}