import { navLinks } from "@/data/navigation";
import { SITE } from "@/data/site";
import { TransitionLink } from "@/components/global/PageTransition";
import LocalTime from "@/components/global/LocalTime";
import Magnetic from "@/components/ui/Magnetic";
import { underline } from "@/components/ui/underline";
import { cn } from "@/lib/cn";

export default function Footer() {
  return (
    <footer data-world="ink" className="relative overflow-hidden px-4 pt-24 md:px-10">
      <div className="grid gap-12 border-t hairline pt-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-mono text-meta uppercase">Have a project in mind?</p>
          <Magnetic className="mt-4">
            <TransitionLink
              href="/contact"
              className="inline-block font-display text-display-lg uppercase text-vermilion"
            >
              Start a project ↗
            </TransitionLink>
          </Magnetic>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-meta uppercase opacity-60">Sitemap</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <TransitionLink href={link.href} className={cn("text-sm uppercase", underline)}>
                  {link.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-meta uppercase opacity-60">Reach us</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className={cn(underline)}>
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(underline)}
              >
                WhatsApp ↗
              </a>
            </li>
            <li>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(underline)}
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t hairline py-5 font-mono text-meta uppercase">
        <span>© 2026 {SITE.name} — {SITE.location}</span>
        <LocalTime />
        <span>
          {SITE.est} <span aria-hidden="true">△</span> {SITE.coords}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[5vw] translate-y-[24%] select-none whitespace-nowrap font-display text-[14.5vw] font-medium uppercase leading-none tracking-[-0.02em]"
      >
        {SITE.wordmark}
      </div>
    </footer>
  );
}
