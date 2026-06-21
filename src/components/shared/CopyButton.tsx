import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, className, alwaysShowText }: { text: string; className?: string; alwaysShowText?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-bg-secondary hover:bg-border-base text-text-secondary rounded transition-colors",
        copied && "text-success",
        className
      )}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {(alwaysShowText || copied) && <span>{copied ? "Copied" : "Copy"}</span>}
    </button>
  );
}
