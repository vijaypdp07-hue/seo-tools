import { useState, useRef, useEffect } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Code, Play, RefreshCcw } from "lucide-react";

export function HtmlViewerPage() {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
    <title>My Test Page</title>
    <style>
        body { font-family: sans-serif; background: #fff; color: #333; padding: 2rem; }
        h1 { color: #2563EB; }
        .box { padding: 1rem; border: 1px solid #ccc; border-radius: 8px; margin-top: 1rem; }
    </style>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a live preview of your HTML code.</p>
    <div class="box">
        Edit the code on the left to see changes instantly!
    </div>
</body>
</html>`);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Only update preview when code changes 
    // The iframe has sandbox="allow-scripts" but not "allow-same-origin"
    // which protects against XSS accessing our parent window state.
  }, [htmlCode]);

  return (
    <ToolWrapper
      title="HTML Viewer"
      description="Write, edit and preview HTML/CSS/JS code instantly in a secure sandboxed environment."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Editor */}
        <div className="flex flex-col border border-border-base rounded-xl overflow-hidden shadow-sm bg-[#1E1E1E]">
            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/10 shrink-0">
               <div className="flex items-center gap-2">
                 <Code className="size-4 text-primary" />
                 <span className="text-xs font-semibold text-white/70">HTML Editor</span>
               </div>
               <button 
                  onClick={() => setHtmlCode("")}
                  className="text-xs text-white/50 hover:text-error transition-colors flex items-center gap-1"
               >
                  <RefreshCcw className="size-3" /> Clear
               </button>
            </div>
            <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-full p-4 bg-transparent text-gray-300 font-mono text-sm focus:outline-none resize-none"
                spellCheck="false"
                placeholder="Paste your HTML code here..."
            />
        </div>

        {/* Live Preview */}
        <div className="flex flex-col border border-border-base rounded-xl overflow-hidden shadow-sm bg-white">
             <div className="flex items-center justify-between px-4 py-2 bg-bg-secondary border-b border-border-base shrink-0">
               <div className="flex items-center gap-2">
                 <Play className="size-4 text-success" />
                 <span className="text-xs font-semibold text-text-primary">Live Output</span>
               </div>
            </div>
            <div className="w-full h-full bg-white relative">
                 <iframe
                    ref={iframeRef}
                    title="HTML Preview"
                    srcDoc={htmlCode}
                    sandbox="allow-scripts" // NEVER add allow-same-origin here
                    className="w-full h-full absolute inset-0 bg-white"
                 />
            </div>
        </div>
      </div>
    </ToolWrapper>
  );
}
