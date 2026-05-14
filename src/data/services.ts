export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "web",
    icon: "Globe",
    title: "Full-Stack Web Development",
    shortDescription: "End-to-end web applications from concept to deployment.",
    features: [
      "Custom web applications",
      "E-commerce platforms",
      "API development & integration",
      "Performance optimization",
      "Cloud deployment (AWS, Vercel)",
    ],
  },
  {
    id: "design",
    icon: "Palette",
    title: "UI/UX Design + Development",
    shortDescription: "Beautiful interfaces that users love, backed by solid code.",
    features: [
      "User research & personas",
      "Wireframes & prototypes",
      "High-fidelity UI design",
      "Design systems",
      "Frontend development",
    ],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    title: "Mobile App Development",
    shortDescription: "Cross-platform mobile apps that work flawlessly on iOS and Android.",
    features: [
      "React Native development",
      "Flutter development",
      "App store deployment",
      "Push notifications",
      "Offline-first architecture",
    ],
  },
  {
    id: "marketing",
    icon: "TrendingUp",
    title: "SEO & Digital Marketing",
    shortDescription: "Drive organic traffic and grow your online presence strategically.",
    features: [
      "Technical SEO audits",
      "Content strategy",
      "Google Ads management",
      "Conversion rate optimization",
      "Analytics & reporting",
    ],
  },
];