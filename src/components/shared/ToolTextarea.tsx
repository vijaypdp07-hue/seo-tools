import { ChangeEvent } from "react";
import { Copy, Trash2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  onSample?: () => void;
  onPaste?: () => void;
  onClear?: () => void;
  className?: string;
}

export function ToolTextarea({
  value,
  onChange,
  placeholder = "Paste your text here...",
  maxLength,
  onSample,
  onPaste,
  onClear,
  className,
}: ToolTextareaProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn("flex flex-col border border-border-base rounded-md overflow-hidden bg-bg-base", className)}>
      <div className="flex items-center justify-between p-2 pb-0 bg-bg-secondary border-b border-border-base">
        <div className="flex gap-1">
          {onPaste && (
            <button
              onClick={onPaste}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-bg-tertiary rounded-md transition-colors"
            >
              <Copy className="size-4" /> <span className="hidden sm:inline">Paste</span>
            </button>
          )}
          {onSample && (
            <button
              onClick={onSample}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-bg-tertiary rounded-md transition-colors"
            >
              <Wand2 className="size-4" /> <span className="hidden sm:inline">Sample</span>
            </button>
          )}
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-error hover:bg-error-light rounded-md transition-colors"
          >
            <Trash2 className="size-4" /> <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>

      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="flex-1 w-full p-4 bg-transparent text-text-primary resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/20 placeholder:text-text-muted min-h-[200px]"
      />
    </div>
  );
}
