"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { fadeUp, staggerContainer } from "@/lib/animations/framerVariants";
import { blogPosts } from "@/data/blog";

export default function BlogPreview() {
  const { ref, inView } = useInView(0.15);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono text-accent-tertiary uppercase tracking-widest">
            Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-2">
            Latest Insights
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.slug} variants={fadeUp}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="glass-card overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background-base/30 group-hover:bg-background-base/50 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-[10px] font-mono text-accent-primary uppercase tracking-widest mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-base font-display font-semibold text-text-primary group-hover:text-accent-primary transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-text-secondary flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-3 mt-4 text-xs text-text-tertiary font-mono">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {post.readTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors"
          >
            Read All Articles <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}