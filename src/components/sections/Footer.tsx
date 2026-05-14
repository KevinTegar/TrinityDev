import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border-default py-12">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div>
          <Link href="/" className="text-xl font-display font-bold text-text-primary">TrinityDev</Link>
          <p className="text-sm text-text-secondary mt-2">We build exceptional digital experiences.</p>
        </div>
        <p className="text-xs text-text-tertiary">© 2026 TrinityDev. All rights reserved.</p>
      </div>
    </footer>
  );
}