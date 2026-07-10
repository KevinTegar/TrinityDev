import Marquee from "@/components/ui/Marquee";
import Magnetic from "@/components/ui/Magnetic";
import { TransitionLink } from "@/components/global/PageTransition";

export default function CtaMarquee() {
  return (
    <section data-world="ink" className="py-28 md:py-40">
      <Marquee duration={28} className="border-y hairline py-6">
        <span className="px-6 font-display text-display-xl font-medium uppercase">
          Let&apos;s build something rare
        </span>
        <span aria-hidden="true" className="px-6 font-display text-display-xl text-vermilion">
          △
        </span>
      </Marquee>
      <div className="mt-16 flex flex-col items-center gap-6 px-4 text-center">
        <p className="font-mono text-meta uppercase opacity-60">Currently booking — Q4 2026</p>
        <Magnetic>
          <TransitionLink
            href="/contact"
            data-cursor="open"
            className="inline-block border border-current px-10 py-5 font-display text-display-md font-medium uppercase transition-colors duration-300 hover:border-vermilion hover:bg-vermilion hover:text-paper"
          >
            Start a project ↗
          </TransitionLink>
        </Magnetic>
      </div>
    </section>
  );
}
