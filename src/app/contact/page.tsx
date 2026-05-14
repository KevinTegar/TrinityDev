"use client";
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const budgetOptions = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
];

const projectTypes = [
  "Web Development",
  "UI/UX Design",
  "Mobile App",
  "SEO & Marketing",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: submit to API
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-32 bg-background-base min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent-primary uppercase tracking-widest">
            Contact
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary mt-2">
            Start a Project
          </h1>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Tell us about your project. We respond within 24 hours and offer a free initial
            consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <MessageCircle size={18} className="text-accent-primary" />
                <span className="text-sm font-medium text-text-primary">WhatsApp</span>
              </div>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary transition-colors text-sm block"
              >
                +62 812 XXXX XXXX
              </a>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-accent-primary" />
                <span className="text-sm font-medium text-text-primary">Location</span>
              </div>
              <p className="text-text-secondary text-sm">Jakarta, Indonesia</p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-accent-primary" />
                <span className="text-sm font-medium text-text-primary">Response Time</span>
              </div>
              <p className="text-text-secondary text-sm">Within 24 hours, weekdays</p>
            </div>

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 flex items-center gap-4 hover:border-accent-tertiary transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-accent-tertiary/10 rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-accent-tertiary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-primary">Prefer WhatsApp?</div>
                <div className="text-xs text-text-secondary">Chat with us directly</div>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="glass-card p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-accent-tertiary/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} className="text-accent-tertiary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-text-primary">
                  Message Sent!
                </h2>
                <p className="text-text-secondary">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background-base border border-border-default rounded text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background-base border border-border-default rounded text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                      Project Type
                    </label>
                    <select
                      required
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-background-base border border-border-default rounded text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                    >
                      <option value="">Select type</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                      Budget Range
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-background-base border border-border-default rounded text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
                    >
                      <option value="">Select budget</option>
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-text-secondary uppercase tracking-wider">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background-base border border-border-default rounded text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors resize-none"
                    placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                  />
                </div>

                <button type="submit" className="btn-glow w-full py-3 flex items-center justify-center gap-2">
                  <Send size={16} /> Send Message
                </button>

                <p className="text-xs text-text-tertiary text-center">
                  We typically respond within 24 hours. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}