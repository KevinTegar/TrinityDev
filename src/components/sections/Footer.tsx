import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { footerLinks } from "@/data/navigation";

const socials = [
  { icon: Github, href: "https://github.com/trinitydev" },
  { icon: Twitter, href: "https://twitter.com/trinitydev" },
  { icon: Linkedin, href: "https://linkedin.com/company/trinitydev" },
  { icon: Instagram, href: "https://instagram.com/trinitydev" },
];

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border-default">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-display font-bold text-text-primary">
              TrinityDev
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              We build exceptional digital experiences for startups and established brands.
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-text-tertiary hover:text-accent-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 font-mono uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 font-mono uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 font-mono uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-text-secondary">hello@trinitydev.io</li>
              <li className="text-sm text-text-secondary">+62 812 XXXX XXXX</li>
              <li className="text-sm text-text-secondary">Jakarta, Indonesia</li>
            </ul>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-text-tertiary mb-2 font-mono">Subscribe to updates</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-background-base border border-border-default rounded text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors"
                />
                <button type="submit" className="btn-glow px-3 py-2 text-xs whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            © 2026 TrinityDev. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary">
            Crafted with precision in Jakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
