export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "TrinityDev transformed our outdated website into a modern platform that increased our conversion rate by 47%. Their attention to detail and technical expertise is unmatched.",
    name: "Rizky Pratama",
    role: "CEO",
    company: "Vortal Indonesia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
  {
    id: "2",
    quote: "Working with TrinityDev was a game-changer. They delivered our mobile app 2 weeks ahead of schedule with exceptional quality. Our users love the new experience.",
    name: "Sarah Wijaya",
    role: "Product Manager",
    company: "HealthEase",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
  },
  {
    id: "3",
    quote: "The analytics dashboard they built has become the backbone of our business intelligence. Real-time data at our fingertips — it's incredible.",
    name: "Ahmad Fauzi",
    role: "CTO",
    company: "FinTrack",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
  },
  {
    id: "4",
    quote: "Our brand redesign exceeded expectations. TrinityDev understood our vision and elevated it to a level we couldn't have imagined.",
    name: "Lisa Gunawan",
    role: "Founder",
    company: "Groceria",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
  },
  {
    id: "5",
    quote: "Professional, responsive, and incredibly talented. TrinityDev has been our go-to development partner for 2 years and counting.",
    name: "Denny Kusuma",
    role: "Director",
    company: "TechCorp ID",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
  },
];