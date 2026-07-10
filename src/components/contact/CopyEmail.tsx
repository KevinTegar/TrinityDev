"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/http) — the mailto link next to this still works.
    }
  };

  return (
    <div className="flex flex-wrap items-baseline gap-4">
      <a
        href={`mailto:${SITE.email}`}
        className="break-all font-display text-display-lg font-medium uppercase transition-colors duration-300 hover:text-vermilion"
      >
        {SITE.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="border border-current px-3 py-1 font-mono text-meta uppercase transition-colors duration-300 hover:border-vermilion hover:bg-vermilion hover:text-paper"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
