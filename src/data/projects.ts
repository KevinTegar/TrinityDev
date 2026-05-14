export interface Project {
  slug: string;
  title: string;
  category: "Web" | "Mobile" | "Design" | "Marketing";
  thumbnail: string;
  description: string;
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: "vortal-commerce",
    title: "Vortal Commerce Platform",
    category: "Web",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description: "Full-stack e-commerce platform for a fashion retailer, handling 10,000+ daily transactions.",
    metrics: [
      { label: "Conversion Rate", value: "+47%" },
      { label: "Page Load", value: "1.2s" },
      { label: "Monthly Revenue", value: "+$120K" },
    ],
  },
  {
    slug: "healthease-app",
    title: "HealthEase Mobile App",
    category: "Mobile",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    description: "Cross-platform mobile app connecting patients with healthcare providers in Indonesia.",
    metrics: [
      { label: "Downloads", value: "50K+" },
      { label: "App Rating", value: "4.8★" },
      { label: "User Retention", value: "82%" },
    ],
  },
  {
    slug: "fintrack-dashboard",
    title: "FinTrack Analytics Dashboard",
    category: "Web",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    description: "Real-time financial analytics dashboard for a fintech startup with live data visualization.",
    metrics: [
      { label: "Data Points/Day", value: "1M+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Active Users", value: "5,000+" },
    ],
  },
  {
    slug: "groceria-redesign",
    title: "Groceria Brand Redesign",
    category: "Design",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    description: "Complete brand identity and UX redesign for an Indonesian grocery delivery service.",
    metrics: [
      { label: "Brand Recognition", value: "+65%" },
      { label: "User Signups", value: "+200%" },
      { label: "NPS Score", value: "78" },
    ],
  },
];