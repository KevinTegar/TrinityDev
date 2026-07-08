import Image from "next/image";
import { team } from "@/data/team";

export const metadata = {
  title: "Team",
  description: "Meet the talented team behind TrinityDev.",
};

export default function TeamPage() {
  return (
    <div className="pt-24 pb-32 bg-background-base min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-xs font-mono text-accent-secondary uppercase tracking-widest">
            People
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-text-primary mt-2">
            Meet the Team
          </h1>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            A small, skilled team united by a passion for building great digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map((member) => (
            <div key={member.id} className="glass-card p-8 flex flex-col sm:flex-row gap-6">
              <div className="relative w-28 h-28 flex-shrink-0 rounded-full overflow-hidden">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-xl font-display font-semibold text-text-primary">
                    {member.name}
                  </h2>
                  <p className="text-sm font-mono text-accent-primary">{member.role}</p>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 bg-background-elevated text-xs font-mono text-text-tertiary rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-text-tertiary italic">"{member.funFact}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}