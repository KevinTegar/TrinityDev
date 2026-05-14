import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import InteractiveDemo from "@/components/sections/InteractiveDemo";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";
import TeamPreview from "@/components/sections/TeamPreview";
import BlogPreview from "@/components/sections/BlogPreview";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <InteractiveDemo />
      <PortfolioPreview />
      <Statistics />
      <Testimonials />
      <TeamPreview />
      <BlogPreview />
      <CTASection />
    </>
  );
}