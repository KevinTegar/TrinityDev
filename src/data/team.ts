export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  specialties: string[];
  funFact: string;
}

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Bayu Santoso",
    role: "Founder & Lead Developer",
    bio: "Full-stack architect with 8+ years building scalable web applications. Passionate about clean code and performance optimization.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    specialties: ["Next.js", "Node.js", "AWS", "System Design"],
    funFact: "Has shipped 100+ projects and still writes code at midnight.",
  },
  {
    id: "2",
    name: "Anisa Rahman",
    role: "UI/UX Designer",
    bio: "Design specialist crafting beautiful and intuitive interfaces. Believes great design is invisible — it just works.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    specialties: ["Figma", "Motion Design", "Design Systems", "Branding"],
    funFact: "Creates art installations on weekends. Designs come alive with motion.",
  },
  {
    id: "3",
    name: "Rizky Chandra",
    role: "Mobile Developer",
    bio: "Cross-platform mobile specialist with expertise in React Native and Flutter. Delivers native-quality apps users love.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    specialties: ["React Native", "Flutter", "iOS", "Android"],
    funFact: "Maintains a 4.9★ average across all published apps.",
  },
  {
    id: "4",
    name: "Diana Putri",
    role: "SEO & Marketing Strategist",
    bio: "Digital marketing expert with a data-driven approach. Helps brands grow organic traffic and convert visitors into customers.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    specialties: ["SEO", "Content Strategy", "Google Ads", "Analytics"],
    funFact: "Has helped 30+ clients reach page 1 on Google.",
  },
];