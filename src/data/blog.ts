export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  readTime: number;
  date: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-startups-need-strong-web-presence",
    title: "Why Startups Need a Strong Web Presence in 2026",
    category: "Strategy",
    excerpt: "Your website is your first impression, your 24/7 salesperson, and your brand's digital home. Here's why it can't be an afterthought.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    readTime: 5,
    date: "2026-04-28",
    author: "Bayu Santoso",
  },
  {
    slug: "how-to-choose-web-development-partner",
    title: "How to Choose the Right Web Development Partner",
    category: "Guide",
    excerpt: "Not all development agencies are created equal. Here's the checklist we recommend before signing any contract.",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    readTime: 7,
    date: "2026-04-15",
    author: "Anisa Rahman",
  },
  {
    slug: "cost-of-website-in-2026",
    title: "The Real Cost of a Website in 2026: What to Budget",
    category: "Finance",
    excerpt: "Website budgets range from $500 to $500,000. Here's a transparent breakdown of what you're actually paying for.",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    readTime: 6,
    date: "2026-04-01",
    author: "Bayu Santoso",
  },
];