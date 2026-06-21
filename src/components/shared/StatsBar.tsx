import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string | number;
}

interface StatsBarProps {
  stats: StatItem[];
  className?: string;
}

export function StatsBar({ stats, className }: StatsBarProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className={cn("bg-bg-tertiary border border-border-base rounded-md px-6 py-4 flex flex-wrap gap-4 divide-x divide-border-base", className)}>
      {stats.map((stat, i) => (
        <div key={i} className={cn("px-4 first:pl-0 flex flex-col items-center justify-center flex-1 min-w-[100px]")}>
          <span className="text-sm text-text-secondary font-medium">{stat.label}</span>
          <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
