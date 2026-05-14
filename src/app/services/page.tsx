import Link from "next/link";
import { services } from "@/data/services";
import { Globe, Palette, Smartphone, TrendingUp, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  web: <Globe size={32} className="text-accent-primary" />,
  design: <Palette size={32} className="text-accent-primary" />,
  mobile: <Smartphone size={32} className="text-accent-primary" />,
  marketing: <TrendingUp size={32} className="text-accent-primary" />,
};

export const metadata = {
  title: "Services",
  description: "Full-stack web development, UI/UX design, mobile apps, and SEO & digital marketing services by TrinityDev.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-32 bg-background-base min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-mono text-accent-secondary uppercase tracking-widest">
            What We Offer
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary mt-2">
            Our Services
          </h1>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            End-to-end digital solutions, from strategy and design to development and marketing.
          </p>
        </div>

        {/* Services detail */}
        <div className="space-y-12">
          {services.map((service) => (
            <div key={service.id} className="glass-card p-10 md:p-14">
              <div className="flex items-start gap-6 mb-8">
                {iconMap[service.id]}
                <div>
                  <h2 className="text-3xl font-display font-bold text-text-primary">
                    {service.title}
                  </h2>
                  <p className="text-text-secondary mt-2">{service.shortDescription}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle size={16} className="text-accent-tertiary flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/contact" className="btn-glow px-6 py-2 text-sm inline-flex items-center gap-2">
                  Get a Quote <CheckCircle size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
            Our Process
          </h2>
          <p className="text-text-secondary mb-12">How we deliver exceptional results, every time.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Discovery", "Design", "Develop", "Deliver"].map((step, i) => (
              <div key={step} className="glass-card p-6 text-center">
                <div className="text-4xl font-display font-bold text-accent-primary/20 mb-2">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}