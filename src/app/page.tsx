import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import SelectedWork from "@/components/home/SelectedWork";
import Capabilities from "@/components/home/Capabilities";
import CtaMarquee from "@/components/home/CtaMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <SelectedWork />
      <Capabilities />
      <CtaMarquee />
    </>
  );
}
