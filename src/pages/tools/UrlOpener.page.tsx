import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { ExternalLink, Link as LinkIcon, AlertTriangle } from "lucide-react";

export function UrlOpenerPage() {
  const [urls, setUrls] = useState("");
  const [delay, setDelay] = useState(1);
  const [isOpening, setIsOpening] = useState(false);
  const [openedCount, setOpenedCount] = useState(0);

  const handleOpenUrls = async () => {
    const list = urls.split('\n')
                     .map(u => u.trim())
                     .filter(u => u !== '');
    
    if (list.length === 0) return;

    // Safety warning for too many tabs
    if (list.length > 50 && !window.confirm(`You are about to open ${list.length} tabs. This might freeze your browser. Continue?`)) {
        return;
    }

    setIsOpening(true);
    setOpenedCount(0);

    for (let i = 0; i < list.length; i++) {
        let url = list[i];
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        // Must happen as direct result of user gesture to bypass popup blockers ideally,
        // but with delay it will likely be blocked by popup blockers. 
        // We warn the user about this.
        window.open(url, '_blank');
        setOpenedCount(i + 1);

        if (delay > 0 && i < list.length - 1) {
            await new Promise(r => setTimeout(r, delay * 1000));
        }
    }

    setIsOpening(false);
  };

  return (
    <ToolWrapper
      title="Bulk URL Opener"
      description="Open multiple URLs at once in new browser tabs. Useful for SEO checks, research, or testing."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        <div className="bg-warning-light border border-warning/20 p-4 rounded-lg flex gap-3 text-warning-dark">
            <AlertTriangle className="shrink-0 size-5 text-warning" />
            <div className="text-sm">
                <p className="font-bold">Popup Blocker Warning</p>
                <p>Your browser will likely block multiple popups. You must click <strong>"Always allow popups from this site"</strong> in your browser's address bar to use this tool properly.</p>
            </div>
        </div>

        <div className="space-y-4 bg-bg-base border border-border-base rounded-xl p-6 shadow-sm">
            <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary flex justify-between">
                    <span>Enter URLs (one per line)</span>
                    <span className="text-xs text-text-muted">{urls.split('\n').filter(u=>u.trim().length > 0).length} URLs</span>
                </label>
                <textarea
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                    rows={12}
                    placeholder="https://example.com&#10;https://google.com&#10;example.org"
                    className="font-mono w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm resize-none"
                />
            </div>

            <div className="flex flex-wrap items-end gap-4 bg-bg-secondary p-4 rounded-lg border border-border-base">
                <div className="space-y-1 flex-1 min-w-[200px]">
                    <label className="text-sm font-medium text-text-secondary">Delay between tabs (seconds)</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        value={delay}
                        onChange={(e) => setDelay(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-bg-base border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
                    />
                </div>
                
                <button
                    onClick={handleOpenUrls}
                    disabled={isOpening || urls.trim() === ""}
                    className="flex-1 min-w-[200px] py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {isOpening ? (
                         <>Opening {openedCount}...</>
                    ) : (
                         <><ExternalLink className="size-5" /> Open All URLs</>
                    )}
                </button>
            </div>
        </div>
      </div>
    </ToolWrapper>
  );
}
