import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  duration?: number;
  className?: string;
};

export default function Marquee({ children, duration = 24, className }: Props) {
  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <div
        className="animate-marquee flex shrink-0 items-center"
        style={{ animationDuration: `${duration}s` }}
      >
        <span className="flex items-center">{children}</span>
        <span className="flex items-center" aria-hidden="true">
          {children}
        </span>
      </div>
    </div>
  );
}
