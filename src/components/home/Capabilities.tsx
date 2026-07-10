"use client";

import { useState } from "react";
import { capabilities } from "@/data/capabilities";

export default function Capabilities() {
  const [open, setOpen] = useState(0);

  return (
    <section data-world="paper" className="px-4 pb-32 md:px-10 md:pb-48">
      <p className="mb-10 font-mono text-meta uppercase">(03) — Capabilities</p>
      <ul>
        {capabilities.map((cap, i) => {
          const isOpen = open === i;
          return (
            <li key={cap.index} className="border-t hairline last:border-b">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`cap-panel-${cap.index}`}
                className="grid w-full grid-cols-[3.5rem_1fr_auto] items-baseline gap-3 py-7 text-left md:gap-8"
              >
                <span className="font-mono text-meta text-vermilion">{cap.index}</span>
                <span className="font-display text-display-md font-medium uppercase">
                  {cap.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`font-mono text-meta transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                id={`cap-panel-${cap.index}`}
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-6 pb-8 pl-[3.5rem] md:grid-cols-2 md:gap-8">
                    <p className="max-w-md text-sm leading-relaxed opacity-80">{cap.description}</p>
                    <ul className="space-y-2">
                      {cap.items.map((item) => (
                        <li key={item} className="border-b hairline pb-2 font-mono text-meta uppercase">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
