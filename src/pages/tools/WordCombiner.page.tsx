import { useState } from "react";
import { Copy, Trash2, Wand2, Download, Check } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

const SAMPLE_TEXT = "apple\nbanana\ncherry\ndate";

export function WordCombinerPage() {
  const [list1, setList1] = useState("");
  const [list2, setList2] = useState("");
  const [result, setResult] = useState("");
  const [separator, setSeparator] = useState(" ");
  const [copied, setCopied] = useState(false);

  const handleCombine = () => {
    const arr1 = list1.split("\n").filter(l => l.trim() !== "");
    const arr2 = list2.split("\n").filter(l => l.trim() !== "");
    const combined = [];
    
    // Example logic: cartesian product, or index-by-index. 
    // Usually word combiners do cartesian product.
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            combined.push(`${arr1[i]}${separator}${arr2[j]}`);
        }
    }
    setResult(combined.join("\n"));
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "combined-words.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolWrapper
      title="Word Combiner"
      description="Combine two lists of words into all possible combinations."
      categoryName="Text Tools"
      categoryPath="/tools/text"
      seoContent={
        <div>
            <h2>How to use the Word Combiner</h2>
            <ol>
                <li>Enter your first list of words in the left box (one per line).</li>
                <li>Enter your second list of words in the right box (one per line).</li>
                <li>Choose a separator (space, hyphen, comma, or none).</li>
                <li>Click 'Combine Words' to generate all combinations.</li>
            </ol>
            <p>This tool is excellent for generating domain name ideas, SEO keyword combinations, and ad campaign match types.</p>
        </div>
      }
    >
      <div className="flex flex-col gap-0">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pb-0 items-start">
             <div className="space-y-2">
                 <div className="flex justify-between items-center px-1">
                     <label className="text-sm font-medium text-text-primary">List 1</label>
                     <button onClick={() => setList1(SAMPLE_TEXT)} className="text-xs text-primary hover:underline">Sample</button>
                 </div>
                 <textarea
                  value={list1}
                  onChange={(e) => setList1(e.target.value)}
                  placeholder="Enter words here (one per line)"
                  className="w-full h-48 p-4 bg-bg-base text-text-primary border border-border-base rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
             </div>
             <div className="space-y-2">
                 <div className="flex justify-between items-center px-1">
                     <label className="text-sm font-medium text-text-primary">List 2</label>
                     <button onClick={() => setList2("tree\nfruit\npie")} className="text-xs text-primary hover:underline">Sample</button>
                 </div>
                 <textarea
                  value={list2}
                  onChange={(e) => setList2(e.target.value)}
                  placeholder="Enter words here (one per line)"
                  className="w-full h-48 p-4 bg-bg-base text-text-primary border border-border-base rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
             </div>
         </div>

         <div className="p-4 flex flex-col sm:flex-row items-center gap-4 border-b border-border-base">
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Separator:</label>
                <select 
                    value={separator} 
                    onChange={e => setSeparator(e.target.value)}
                    className="p-1.5 text-sm bg-bg-base border border-border-base rounded outline-none focus:border-primary"
                >
                    <option value=" ">Space ( )</option>
                    <option value="">None</option>
                    <option value="-">Hyphen (-)</option>
                    <option value="_">Underscore (_)</option>
                    <option value=",">Comma (,)</option>
                    <option value=".">Dot (.)</option>
                </select>
            </div>
            <button 
                onClick={handleCombine}
                className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors sm:ml-auto w-full sm:w-auto"
            >
                Combine Words
            </button>
         </div>

         {/* Output Area */}
         <div className="p-4 space-y-2 bg-bg-secondary">
             <div className="flex justify-between items-center px-1">
                 <label className="text-sm font-medium text-text-primary">Result ({result ? result.split('\n').length : 0} items)</label>
             </div>
             <textarea
                readOnly
                value={result}
                placeholder="Combinations will appear here..."
                className="w-full h-64 p-4 bg-bg-base text-text-primary border border-border-base rounded-md resize-none focus:outline-none"
             />
             <div className="flex justify-end gap-2 pt-2">
                 <button 
                    onClick={handleCopy}
                    disabled={!result}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {copied ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Copy List</>}
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
