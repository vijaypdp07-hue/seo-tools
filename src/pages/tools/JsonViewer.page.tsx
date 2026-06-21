import { useState } from "react";
import { Copy, Trash2, Wand2, Download, Check } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

const SAMPLE_JSON = `{
  "name": "SEO Tools Platform",
  "version": 3.0,
  "features": [
    "Text Tools",
    "Image Tools",
    "PDF Tools"
  ],
  "clientSideProcessed": true,
  "nestedObject": {
    "speed": "blazing fast",
    "privacy": "high"
  }
}`;

export function JsonViewerPage() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFormat = () => {
      try {
          const parsed = JSON.parse(inputText);
          const formatted = JSON.stringify(parsed, null, 2);
          setInputText(formatted);
          setErrorMsg("");
      } catch (err) {
          if (err instanceof Error) {
              setErrorMsg(err.message);
          } else {
              setErrorMsg("Invalid JSON");
          }
      }
  };

  const handleMinify = () => {
      try {
          const parsed = JSON.parse(inputText);
          const minified = JSON.stringify(parsed);
          setInputText(minified);
          setErrorMsg("");
      } catch (err) {
          if (err instanceof Error) {
              setErrorMsg(err.message);
          } else {
              setErrorMsg("Invalid JSON");
          }
      }
  };

  const handleCopy = () => {
    if (!inputText) return;
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!inputText) return;
    const blob = new Blob([inputText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolWrapper
      title="JSON Viewer & Formatter"
      description="Format, prettify, minify, and validate JSON data instantly in your browser."
      categoryName="Dev Tools"
      categoryPath="/tools/dev"
      seoContent={
          <div>
              <h2>How to use the JSON Formatter</h2>
              <ol>
                  <li>Paste your unstructured or structured JSON string into the text area.</li>
                  <li>Click 'Format JSON' to make it readable and beautifully indented.</li>
                  <li>Click 'Minify JSON' to compress it into a single line.</li>
                  <li>Secure and private—your data never leaves your browser.</li>
              </ol>
          </div>
      }
    >
      <div className="flex flex-col border-b border-border-base relative h-[600px]">
           <div className="flex items-center justify-between p-2 bg-bg-secondary border-b border-border-base">
               <div className="flex gap-2 text-sm font-medium text-text-primary px-2">
                   <button 
                       onClick={handleFormat}
                       className="px-4 py-1.5 bg-bg-base border border-border-base rounded-md hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                       disabled={!inputText}
                   >
                       Format JSON
                   </button>
                   <button 
                       onClick={handleMinify}
                       className="px-4 py-1.5 bg-bg-base border border-border-base rounded-md hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
                       disabled={!inputText}
                   >
                       Minify JSON
                   </button>
               </div>
               <div className="flex gap-2">
                   <button onClick={() => {setInputText(SAMPLE_JSON); setErrorMsg("")}} className="text-xs text-primary font-medium hover:underline flex items-center gap-1 px-3">
                       <Wand2 className="size-3" /> Sample
                   </button>
                   <button onClick={() => {setInputText(""); setErrorMsg("")}} className="text-xs text-error font-medium hover:underline flex items-center gap-1 px-3">
                       <Trash2 className="size-3" /> Clear
                   </button>
               </div>
           </div>

           {errorMsg && (
               <div className="bg-error-light text-error text-sm font-medium px-4 py-2 border-b border-error/20 flex z-10 font-mono items-center gap-2">
                   ❌ {errorMsg}
               </div>
           )}

           <textarea
              value={inputText}
              onChange={(e) => {setInputText(e.target.value); if(errorMsg) setErrorMsg(""); }}
              placeholder='Paste JSON here...'
              spellCheck="false"
              className="flex-1 w-full p-4 bg-bg-base text-text-primary resize-none font-mono text-sm focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/20"
           />

           <div className="flex justify-end gap-2 p-2 bg-bg-secondary border-t border-border-base">
               <button 
                    onClick={handleCopy}
                    disabled={!inputText}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {copied ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Copy JSON</>}
                </button>
                <button 
                    onClick={handleDownload}
                    disabled={!inputText || !!errorMsg}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Download className="size-4" /> Download .json
                </button>
           </div>
      </div>
    </ToolWrapper>
  );
}
