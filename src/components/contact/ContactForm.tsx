"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

const BUDGETS = ["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+"];

const field =
  "w-full border-b hairline bg-transparent py-3 text-base placeholder:opacity-40 focus:border-vermilion";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `Hi TrinityDev — I'm ${name}${email ? ` (${email})` : ""}. ` +
      `Budget: ${budget}. ${message}`;
    window.open(
      `${SITE.whatsappUrl}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      <div>
        <label htmlFor="cf-name" className="font-mono text-meta uppercase opacity-60">
          Name
        </label>
        <input
          id="cf-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-email" className="font-mono text-meta uppercase opacity-60">
          Email (optional)
        </label>
        <input
          id="cf-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-budget" className="font-mono text-meta uppercase opacity-60">
          Budget
        </label>
        <select
          id="cf-budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={field}
        >
          {BUDGETS.map((b) => (
            <option key={b} value={b} className="text-ink">
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="font-mono text-meta uppercase opacity-60">
          About the project
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you building?"
          className={field}
        />
      </div>
      <button
        type="submit"
        data-cursor="open"
        className="border border-current px-8 py-4 font-display text-display-md font-medium uppercase transition-colors duration-300 hover:border-vermilion hover:bg-vermilion hover:text-paper"
      >
        Send via WhatsApp ↗
      </button>
    </form>
  );
}
