"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/blog";

export default function BlogClient() {
  return (
    <div className="pt-24 pb-32 bg-background-base min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-accent-tertiary uppercase tracking-widest">
            Insights
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary mt-2">
            Latest Articles
          </h1>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Thoughts on web development, design, and growing your digital presence.
          </p>
        </motion.div>

        {/* Featured */}
        {blogPosts[0] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-12"
          >
            <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
              <div className="glass-card overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto">
                    <Image
                      src={blogPosts[0].coverImage}
                      alt={blogPosts[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-xs font-mono text-accent-primary uppercase tracking-widest mb-3">
                      {blogPosts[0].category} · Featured
                    </span>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary group-hover:text-accent-primary transition-colors mb-3">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-text-secondary mb-6">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-text-tertiary font-mono">
                      <span>{blogPosts[0].author}</span>
                      <span>{blogPosts[0].date}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {blogPosts[0].readTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="glass-card overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
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
        </div>
      </div>
    </div>
  );
}
