export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  status: "Concept";
  summary: string;
  role: string[];
  stack: string[];
  cover: string;
  images: string[];
  body: { heading: string; text: string }[];
};

export const projects: Project[] = [
  {
    slug: "vortal-commerce",
    title: "Vortal",
    category: "E-commerce",
    year: "2026",
    status: "Concept",
    summary:
      "A concept storefront that treats shopping like editorial browsing — zero clutter, full focus on the product.",
    role: ["Strategy", "UX/UI Design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Stripe (mock)"],
    cover:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600&auto=format&fit=crop",
    ],
    body: [
      {
        heading: "The premise",
        text: "Most storefronts bury the product under chrome — banners, badges, popups fighting for attention. Vortal strips commerce back to its essentials: typography, photography, and a checkout that never pulls you out of the flow.",
      },
      {
        heading: "The build",
        text: "Static-first Next.js with edge-cached product pages, optimistic cart state, and a component system tuned for conversion without a single dark pattern. Sub-second loads on mid-range phones was the acceptance bar.",
      },
    ],
  },
  {
    slug: "healthease-app",
    title: "HealthEase",
    category: "Product design",
    year: "2026",
    status: "Concept",
    summary:
      "A concept patient portal that makes booking a doctor feel as easy as ordering coffee.",
    role: ["Strategy", "Product Design", "Prototyping"],
    stack: ["Figma", "Next.js", "PostgreSQL (schema)"],
    cover:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1600&auto=format&fit=crop",
    ],
    body: [
      {
        heading: "The premise",
        text: "Healthcare UX punishes the people who need it most. HealthEase reframes the patient portal around one job — get me in front of the right doctor, fast — and pushes everything else behind progressive disclosure.",
      },
      {
        heading: "The design",
        text: "A three-tap booking flow, plain-language medical copy, and an interface that stays calm under stress: high contrast, generous targets, zero decorative noise. Prototyped end-to-end and validated against WCAG AA.",
      },
    ],
  },
  {
    slug: "fintrack-dashboard",
    title: "FinTrack",
    category: "SaaS dashboard",
    year: "2026",
    status: "Concept",
    summary:
      "A concept finance dashboard where clarity beats decoration — dense data, calm interface.",
    role: ["UX Architecture", "UI Design", "Development"],
    stack: ["Next.js", "TypeScript", "Recharts"],
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop",
    ],
    body: [
      {
        heading: "The premise",
        text: "Finance tools confuse density with depth. FinTrack bets the other way: fewer numbers, better hierarchy. Every screen answers one question first — am I okay? — before offering the drill-down.",
      },
      {
        heading: "The build",
        text: "A typed design system where every chart, table and stat tile shares one visual grammar. Built with server components for instant first paint and client interactivity only where data actually moves.",
      },
    ],
  },
  {
    slug: "groceria-redesign",
    title: "Groceria",
    category: "Brand & web",
    year: "2026",
    status: "Concept",
    summary:
      "A concept rebrand for a neighborhood grocery chain — warm, honest, and unmistakably Indonesian.",
    role: ["Brand Identity", "Design System", "Development"],
    stack: ["Identity", "Design tokens", "Next.js"],
    cover:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1600&auto=format&fit=crop",
    ],
    body: [
      {
        heading: "The premise",
        text: "Local chains keep borrowing the visual language of global retail and losing themselves in it. Groceria goes the opposite way: market-stall warmth, honest pricing typography, photography that smells like morning produce.",
      },
      {
        heading: "The system",
        text: "One identity that scales from shelf labels to the web storefront — shared color tokens, one type family, and a component library the in-house team could actually maintain.",
      },
    ],
  },
];
