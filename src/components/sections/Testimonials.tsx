"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp } from "@/lib/animations/framerVariants";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const { ref, inView } = useInView(0.2);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const testimonial = testimonials[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, transition: { duration: 0.3 } }),
  };

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-accent-quaternary uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-2">
            What Clients Say
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative min-h-[300px] flex items-center"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full text-center"
            >
              <div className="glass-card p-10 md:p-14">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-accent-primary fill-accent-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-text-primary leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-text-primary">{testimonial.name}</div>
                    <div className="text-xs text-text-secondary">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-accent-primary w-6" : "bg-border-default"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}