import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnsupportedFeatureNoticeProps {
  feature: string;
  reason: string;
  suggestion: string;
  className?: string;
}

export function UnsupportedFeatureNotice({
  feature,
  reason,
  suggestion,
  className,
}: UnsupportedFeatureNoticeProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center space-y-4 bg-bg-secondary border border-border-base rounded-md", className)}>
      <div className="size-12 bg-bg-tertiary rounded-full flex items-center justify-center text-text-muted mb-2">
        <Compass className="size-6" />
      </div>
      <h3 className="text-xl font-bold text-text-primary">{feature} Unavailable</h3>
      <p className="text-text-secondary max-w-md">
        {reason}
      </p>
      <p className="text-sm font-medium text-text-primary px-4 py-2 bg-warning-light/30 border border-warning/20 rounded max-w-md">
        {suggestion}
      </p>
    </div>
  );
}
