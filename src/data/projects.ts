export interface Project {
  slug: string;
  title: string;
  category: "Web" | "Mobile" | "Design" | "Marketing";
  thumbnail: string;
  description: string;
  metrics?: { label: string; value: string }[];
  challenge?: string;
  approach?: string;
  solution?: string;
}

export const projects: Project[] = [
  {
    slug: "vortal-commerce",
    title: "Vortal Commerce Platform",
    category: "Web",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    description:
      "Full-stack e-commerce platform for a fashion retailer, handling 10,000+ daily transactions.",
    metrics: [
      { label: "Conversion Rate", value: "+47%" },
      { label: "Page Load", value: "1.2s" },
      { label: "Monthly Revenue", value: "+$120K" },
    ],
    challenge:
      "Vortal's legacy e-commerce system couldn't handle peak traffic, suffered a 72% cart abandonment rate, and required manual intervention for every third-party integration. The client was losing an estimated $40,000 per month in abandoned carts alone, with no visibility into where users were dropping off or why.",
    approach:
      "We started with a full technical and UX audit, then rebuilt the platform on Next.js with server-side rendering for SEO and speed. We implemented a headless architecture with a custom cart engine, integrated real-time inventory sync across three warehouses, and redesigned the entire checkout flow using behavioral data extracted from the old system's analytics.",
    solution:
      "The new platform launched in 8 weeks and immediately delivered a 47% improvement in conversion rate. Page load dropped from 6.2 seconds to 1.2 seconds. The system now handles 10,000+ daily transactions with zero downtime and has generated an additional $120,000 in monthly revenue since launch — exceeding the client's 12-month projections within the first quarter.",
  },
  {
    slug: "healthease-app",
    title: "HealthEase Mobile App",
    category: "Mobile",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    description:
      "Cross-platform mobile app connecting patients with healthcare providers in Indonesia.",
    metrics: [
      { label: "Downloads", value: "50K+" },
      { label: "App Rating", value: "4.8★" },
      { label: "User Retention", value: "82%" },
    ],
    challenge:
      "Healthcare access in Indonesia remains deeply fragmented — patients struggle to find the right specialist, wait weeks for appointments, and lose their medical history every time they switch providers. HealthEase needed a mobile platform that could bridge this gap at scale while meeting strict patient data privacy requirements under Indonesian health regulations.",
    approach:
      "We built a cross-platform React Native application with a secure, privacy-compliant backend. The patient-provider matching algorithm factors in location, specialty, real-time availability, and patient history. We implemented end-to-end encryption for all medical communications and offline-capable record storage to serve users in areas with inconsistent connectivity.",
    solution:
      "The app reached 50,000 downloads in its first six months and maintains a 4.8-star rating across both the App Store and Google Play. It has connected over 200 verified healthcare providers with patients across 12 Indonesian cities. User retention at 82% is more than double the 40% industry average, validating the product's genuine utility in users' daily lives.",
  },
  {
    slug: "fintrack-dashboard",
    title: "FinTrack Analytics Dashboard",
    category: "Web",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    description:
      "Real-time financial analytics dashboard for a fintech startup with live data visualization.",
    metrics: [
      { label: "Data Points/Day", value: "1M+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Active Users", value: "5,000+" },
    ],
    challenge:
      "FinTrack's data team was drowning in spreadsheets. Financial data from 15 different sources was being manually consolidated every morning — a four-hour process that produced reports already outdated by the time stakeholders read them. Leadership was making critical decisions on stale data, and the manual process was becoming impossible to sustain as the company scaled.",
    approach:
      "We architected a real-time data pipeline using WebSockets and a custom ETL layer that aggregates from all 15 data sources simultaneously. The dashboard was built with React and D3.js for custom visualization, with role-based access control, automated anomaly detection with alert thresholds, and one-click PDF report generation for board meetings.",
    solution:
      "The daily four-hour data consolidation process became instant. The dashboard now processes over one million data points per day with 99.9% uptime across three time zones. The 5,000+ active users can access live financial intelligence from any device, and the system has become the core decision-making infrastructure for the entire organization — replacing four separate tools that were previously used across departments.",
  },
  {
    slug: "groceria-redesign",
    title: "Groceria Brand Redesign",
    category: "Design",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    description:
      "Complete brand identity and UX redesign for an Indonesian grocery delivery service.",
    metrics: [
      { label: "Brand Recognition", value: "+65%" },
      { label: "User Signups", value: "+200%" },
      { label: "NPS Score", value: "78" },
    ],
    challenge:
      "Groceria was growing in GMV but their brand was actively holding them back. The visual identity was inconsistent across digital and physical touchpoints, the app UX had a 68% drop-off rate before first purchase, and customer interviews revealed that users didn't trust the product quality based on the visual presentation alone. The brand felt cheap in a market where trust is everything.",
    approach:
      "We conducted 40+ user interviews and competitive analysis across eight markets before touching a single pixel. The redesign addressed visual trust signals, information hierarchy in the product catalog, and the emotional journey from discovery to completed purchase. We delivered a complete design system — from logo and color system to component library, motion design guidelines, and physical packaging templates.",
    solution:
      "Brand recognition improved 65% in post-launch surveys. The redesigned app saw user signups increase 200% and the pre-purchase drop-off rate fell from 68% to 31%. The NPS score climbed from 42 to 78. Most significantly, the client's sales team reported that enterprise retail partners began approaching them proactively — citing the elevated brand as the primary reason for their interest.",
  },
];
