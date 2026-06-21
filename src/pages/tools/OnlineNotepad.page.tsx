import { useState, useEffect } from "react";
import { Copy, Trash2, Download, Check, Save, Share } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

export function OnlineNotepadPage() {
  const [text, setText] = useLocalStorage("notepad-content", "");
  const [copied, setCopied] = useState(false);
  const [savedStatus, setSavedStatus] = useState("");

  // Auto-save indication effect
  useEffect(() => {
     if (text) {
         setSavedStatus("Saving...");
         const t = setTimeout(() => setSavedStatus("Changes Saved"), 500);
         const t2 = setTimeout(() => setSavedStatus(""), 3000); // Hide after a bit
         return () => { clearTimeout(t); clearTimeout(t2); };
     } else {
         setSavedStatus("");
     }
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notepad.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Online Notepad",
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("URL copied to clipboard!");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleDownload();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        window.print();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [text]);

  return (
    <ToolWrapper
      title="Online Notepad"
      description="A simple, auto-saving online notepad. Your notes stay strictly in your browser."
      categoryName="Text Tools"
      categoryPath="/tools/text"
      seoContent={
        <div>
            <h2>How to use the Online Notepad</h2>
            <ol>
                <li>Start typing in the text area below.</li>
                <li>Your text is automatically saved to your browser&apos;s local storage as you type.</li>
                <li>You can close the tab and return later; your notes will still be here!</li>
                <li>Download your notes as a text file when you are finished.</li>
            </ol>
            <p><strong>Privacy Note:</strong> This notepad does not sync to the cloud. Do not clear your browser data if you want to keep these notes, or download them to be safe.</p>
        </div>
      }
    >
      <div className="flex flex-col h-[600px]">
        {/* Input Actions */}
        <div className="flex items-center justify-end p-2 pb-0 bg-bg-secondary border-b border-border-base relative">
             <button 
                 onClick={() => {
                     if (window.confirm("Are you sure you want to clear your notes?")) {
                         setText("");
                     }
                 }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-error hover:bg-error-light rounded-md transition-colors"
             >
                <Trash2 className="size-4" /> <span className="hidden sm:inline">Clear All</span>
            </button>
        </div>

        {/* Real Textarea Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing your notes here..."
          className="flex-1 w-full p-6 bg-bg-base text-text-primary resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/20 placeholder:text-text-muted"
        />

        {/* Universal Output Actions */}
        <div className="border-t border-border-base p-2 bg-bg-secondary flex justify-end gap-2 relative">
            <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md transition-colors"
            >
                <Share className="size-4" /> Share
            </button>
            <button 
                onClick={handleCopy}
                disabled={!text}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {copied ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Copy Notes</>}
            </button>
            <button 
                onClick={handleDownload}
                disabled={!text}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Download className="size-4" /> Download
            </button>
            
            {/* Floating Toast Notification */}
            {savedStatus && (
                <div className="absolute top-[-60px] right-6 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div className="bg-bg-base border border-border-base shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-text-primary">
                        <Check className="size-4 text-emerald-500" />
                        {savedStatus}
                    </div>
                </div>
            )}
        </div>
      </div>
    </ToolWrapper>
  );
}
