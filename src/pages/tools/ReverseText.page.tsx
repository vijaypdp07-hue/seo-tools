import { useState, useMemo } from "react";
import { Copy, Trash2, Wand2, Download, Check } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

const SAMPLE_TEXT = "Reverse this text entirely!";

export function ReverseTextPage() {
  const [text, setText] = useState("");
  const [copyMode, setCopyMode] = useState<"copied" | "">("");

  const reversedParams = useMemo(() => {
     if (!text) return { reverseAll: "", reverseWords: "", reverseLetters: "" };
     
     const reverseAll = text.split("").reverse().join("");
     const reverseWords = text.split(" ").reverse().join(" ");
     const reverseLetters = text.split(" ").map(w => w.split("").reverse().join("")).join(" ");

     return { reverseAll, reverseWords, reverseLetters };
  }, [text]);

  const [activeTab, setActiveTab] = useState<"reverseAll" | "reverseWords" | "reverseLetters">("reverseAll");

  const result = reversedParams[activeTab];

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopyMode("copied");
    setTimeout(() => setCopyMode(""), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reversed-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolWrapper
      title="Reverse Text Generator"
      description="Reverse a string of text, reverse word order, or reverse letters in each word."
      categoryName="Text Tools"
      categoryPath="/tools/text"
      seoContent={
        <div>
            <h2>How to use the Reverse Text Generator</h2>
            <ol>
                <li>Paste your text into the primary input box.</li>
                <li>Select how you want to reverse the text (Full reverse, Word order, or Letters).</li>
                <li>The output is generated instantly below.</li>
            </ol>
            <p>This is useful for coding challenges, generating passwords, or just for fun. Everything runs entirely in your browser.</p>
        </div>
      }
    >
      <div className="flex flex-col border-b border-border-base">
         {/* Input Box */}
         <div className="p-4 bg-bg-base border-b border-border-base space-y-2">
              <div className="flex justify-between items-center px-1">
                 <label className="text-sm font-medium text-text-primary">Input Text</label>
                 <div className="flex gap-2">
                     <button onClick={() => setText(SAMPLE_TEXT)} className="text-xs text-primary hover:underline">Sample</button>
                     <button onClick={() => setText("")} className="text-xs text-error hover:underline">Clear</button>
                 </div>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text here..."
                className="w-full h-32 p-4 bg-bg-secondary text-text-primary border border-border-base rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:bg-bg-base"
             />
         </div>

         {/* Mode Selector */}
         <div className="flex bg-bg-secondary border-b border-border-base overflow-x-auto divide-x divide-border-base">
            <button 
                onClick={() => setActiveTab("reverseAll")}
                className={`flex-1 min-w-[120px] py-3 text-sm font-medium transition-colors ${activeTab === 'reverseAll' ? 'bg-bg-base border-b-[3px] border-b-primary text-primary' : 'text-text-secondary hover:bg-bg-base'}`}
            >
                Reverse All
            </button>
            <button 
                onClick={() => setActiveTab("reverseWords")}
                className={`flex-1 min-w-[120px] py-3 text-sm font-medium transition-colors ${activeTab === 'reverseWords' ? 'bg-bg-base border-b-[3px] border-b-primary text-primary' : 'text-text-secondary hover:bg-bg-base'}`}
            >
                Reverse Word Order
            </button>
            <button 
                onClick={() => setActiveTab("reverseLetters")}
                className={`flex-1 min-w-[120px] py-3 text-sm font-medium transition-colors ${activeTab === 'reverseLetters' ? 'bg-bg-base border-b-[3px] border-b-primary text-primary' : 'text-text-secondary hover:bg-bg-base'}`}
            >
                Reverse Letters Only
            </button>
         </div>

         {/* Output Area */}
         <div className="p-4 space-y-2 bg-bg-base">
             <div className="flex justify-between items-center px-1">
                 <label className="text-sm font-medium text-text-primary">Result</label>
             </div>
             <textarea
                readOnly
                value={result}
                placeholder="Output will appear here..."
                className="w-full h-32 p-4 bg-bg-secondary text-text-primary border border-border-base rounded-md resize-none focus:outline-none"
             />
             <div className="flex justify-end gap-2 pt-2">
                 <button 
                    onClick={handleCopy}
                    disabled={!result}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {copyMode === "copied" ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Copy Text</>}
                </button>
                <button 
                    onClick={handleDownload}
                    disabled={!result}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Download className="size-4" /> Download
                </button>
             </div>
         </div>
      </div>
    </ToolWrapper>
  );
}
