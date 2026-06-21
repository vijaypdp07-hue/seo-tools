import { Copy, Download, Check, FileQuestion } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResultPanelProps {
  content: string;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  className?: string;
}

export function ResultPanel({
  content,
  loading = false,
  empty = false,
  emptyMessage = "Your result will appear here",
  onCopy,
  onDownload,
  className,
}: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) onCopy();
    else if (content) {
      navigator.clipboard.writeText(content);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className={cn("flex flex-col border border-border-base rounded-md overflow-hidden bg-bg-base min-h-[200px]", className)}>
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
          <div className="size-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-muted font-medium">Processing...</p>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className={cn("flex flex-col border border-border-base rounded-md overflow-hidden bg-bg-secondary min-h-[200px]", className)}>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
          <FileQuestion className="size-10 text-text-muted/50" />
          <p className="text-text-muted font-medium max-w-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col border border-border-base rounded-md overflow-hidden bg-bg-base", className)}>
      <textarea
        readOnly
        value={content}
        className="flex-1 w-full p-4 bg-transparent text-text-primary resize-none focus:outline-none min-h-[200px]"
      />
      <div className="border-t border-border-base p-2 bg-bg-secondary flex justify-end gap-2">
        {(onCopy || content) && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md transition-colors"
          >
            {copied ? <span className="font-bold">✓ Copied!</span> : <><Copy className="size-4" /> Copy</>}
          </button>
        )}
        {onDownload && (
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md transition-colors"
          >
            <Download className="size-4" /> Download
          </button>
        )}
      </div>
    </div>
  );
}
