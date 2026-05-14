"use client";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-secondary/90 backdrop-blur-xl border-b border-border-default">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-display font-bold text-text-primary">TrinityDev</span>
        <div className="flex gap-6">
          <a href="/work" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Work</a>
          <a href="/services" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Services</a>
          <a href="/team" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Team</a>
          <a href="/blog" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Blog</a>
        </div>
        <a href="/contact" className="btn-glow px-5 py-2 text-sm">Start Project</a>
      </div>
    </nav>
  );
}