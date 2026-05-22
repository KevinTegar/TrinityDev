export interface BlogSection {
  heading?: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  readTime: number;
  date: string;
  author: string;
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-startups-need-strong-web-presence",
    title: "Why Startups Need a Strong Web Presence in 2026",
    category: "Strategy",
    excerpt:
      "Your website is your first impression, your 24/7 salesperson, and your brand's digital home. Here's why it can't be an afterthought.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    readTime: 5,
    date: "2026-04-28",
    author: "Bayu Santoso",
    content: [
      {
        body: "The digital-first economy has fundamentally changed how customers evaluate businesses. Before they read a review, call your number, or walk through your door — they Google you. What they find in the next three seconds determines whether they stay or bounce to a competitor.",
      },
      {
        heading: "The Hidden Cost of a Poor Website",
        body: "Most founders underestimate what a weak web presence actually costs them. A slow, outdated, or confusing website doesn't just fail to convert — it actively repels potential customers. Research consistently shows that 88% of users won't return to a site after a bad experience. That's not just a lost lead. That's a customer you handed directly to your competitor.",
      },
      {
        heading: "What 'Strong' Really Means",
        body: "A strong web presence isn't about having the flashiest design on the internet. It's about load speed under 2 seconds, a mobile-first layout, a clear value proposition above the fold, and trust signals — social proof, portfolio work, team profiles — that answer 'why you?' before the visitor has to ask.",
      },
      {
        heading: "Where to Start",
        body: "If you're pre-revenue or early-stage, focus on three things: a fast, professional homepage, a clear contact path, and at least one strong case study or portfolio piece. Everything else is secondary. Get the fundamentals right first, then layer on sophistication as your business grows.",
      },
    ],
  },
  {
    slug: "how-to-choose-web-development-partner",
    title: "How to Choose the Right Web Development Partner",
    category: "Guide",
    excerpt:
      "Not all development agencies are created equal. Here's the checklist we recommend before signing any contract.",
    coverImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    readTime: 7,
    date: "2026-04-15",
    author: "Anisa Rahman",
    content: [
      {
        body: "The worst agency horror story we hear isn't about bad code. It's about good code delivered three months late, or a beautiful design that nobody on the client's team can update, or a 'finished' product that fails under real traffic. Choosing a development partner is about aligning on values and process — not just comparing price quotes.",
      },
      {
        heading: "Seven Questions to Ask Before Signing",
        body: "Can they show you three live projects similar to yours? Do they have a defined process for scope changes? Who owns the code when the project ends? What does post-launch support look like? Have they built at the scale you're targeting? Can you speak to a past client directly? What's their typical team-to-project ratio? The answers to these questions reveal far more than a portfolio ever could.",
      },
      {
        heading: "Red Flags to Watch For",
        body: "Be cautious of agencies that quote a project without asking detailed questions first, promise timelines that sound too good to be true, can't explain their technical choices in plain language, or go silent for weeks between updates. The best agencies communicate like partners, not like vendors fulfilling a purchase order.",
      },
      {
        heading: "What Great Partnership Looks Like",
        body: "The best development relationships feel collaborative from day one. The agency challenges your assumptions, proposes alternatives you hadn't considered, and treats your business goals as their primary deliverable — not just the feature list. Great code is the output. Shared success is the actual outcome.",
      },
    ],
  },
  {
    slug: "cost-of-website-in-2026",
    title: "The Real Cost of a Website in 2026: What to Budget",
    category: "Finance",
    excerpt:
      "Website budgets range from $500 to $500,000. Here's a transparent breakdown of what you're actually paying for.",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    readTime: 6,
    date: "2026-04-01",
    author: "Bayu Santoso",
    content: [
      {
        body: "We've seen clients spend Rp 3 million on a website and build a billion-rupiah business with it. We've also seen clients spend Rp 500 million on a custom platform and struggle to get 100 users. The cost of a website matters far less than the value it creates — but understanding what you're paying for is the essential first step to spending wisely.",
      },
      {
        heading: "Why Prices Vary So Dramatically",
        body: "A Rp 2 million website and a Rp 50 million website can look identical in a screenshot. The difference lives in what you can't see: server architecture, code maintainability, SEO foundations, accessibility compliance, security hardening, and the capacity to scale without a complete rebuild. Cheap websites have hidden costs that compound aggressively over time.",
      },
      {
        heading: "Budget Tiers Explained",
        body: "Under Rp 5 juta: Template-based, limited customization, best for early validation. Rp 5–15 juta: Semi-custom, design-focused, where most small businesses live comfortably. Rp 15–50 juta: Fully custom, scalable, appropriate for serious product companies. Above Rp 50 juta: Enterprise-grade, complex integrations, high-traffic ready. Most startups do best starting at the Rp 5–15 juta tier and investing more as revenue justifies it.",
      },
      {
        heading: "The True ROI Calculation",
        body: "Stop thinking of your website budget as an expense. Think of it as a conversion rate investment. If your current site converts at 1% and a better site converts at 3%, and you receive 1,000 visitors per month at an average order value of Rp 500,000 — that 2-percentage-point difference is Rp 10 million in additional monthly revenue. A well-built website pays for itself in weeks, not years.",
      },
    ],
  },
];
