import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  message: string;
  className?: string;
  id?: string;
}

export function ErrorMessage({ message, className, id }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div id={id} className={cn("flex items-center gap-2 mt-1 text-sm text-error", className)}>
      <AlertCircle className="size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
