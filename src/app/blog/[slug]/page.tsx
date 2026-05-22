import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-24 pb-32 bg-background-base min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Hero image */}
        <div className="relative aspect-video w-full mb-12 overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-text-tertiary font-mono mb-6">
          <span>{post.author}</span>
          <span>{post.date}</span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime} min read
          </span>
        </div>

        <span className="text-xs font-mono text-accent-primary uppercase tracking-widest mb-4 block">
          {post.category}
        </span>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-8">
          {post.title}
        </h1>

        {/* Dynamic content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>
          {post.content.map((section, i) => (
            <div key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              <p>{section.body}</p>
            </div>
          ))}
        </div>

        {/* Author card */}
        <div className="glass-card p-6 mt-12 flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
              alt={post.author}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary">
              {post.author}
            </div>
            <div className="text-xs text-text-tertiary">
              {post.author === "Bayu Santoso"
                ? "Founder & Lead Developer at TrinityDev"
                : "UI/UX Designer at TrinityDev"}
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border-default">
            <h2 className="text-xl font-display font-bold text-text-primary mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group">
                  <div className="glass-card p-4 flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-accent-primary">
                        {r.category}
                      </span>
                      <h3 className="text-sm font-medium text-text-primary group-hover:text-accent-primary transition-colors mt-1">
                        {r.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
