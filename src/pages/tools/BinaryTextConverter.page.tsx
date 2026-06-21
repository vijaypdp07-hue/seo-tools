import { useState } from "react";
import { Copy, Trash2, Wand2, Download, Check, ArrowLeftRight } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

export function BinaryTextConverterPage() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<"textToBinary" | "binaryToText">("textToBinary");
  const [copied, setCopied] = useState(false);

  // Conversion Logic
  const conversionResult = () => {
      if (!inputText) return "";
      
      try {
          if (mode === "textToBinary") {
              const res = Array.from(inputText)
                  .map((char) => (char as string).charCodeAt(0).toString(2).padStart(8, '0'))
                  .join(' ');
              return res;
          } else {
              // binary to text
              const bins = inputText.trim().split(/\s+/);
              return bins.map(bin => String.fromCharCode(parseInt(bin, 2))).join("");
          }
      } catch (e) {
          return "Invalid Input";
      }
  };

  const outputText = conversionResult();

  const handleCopy = () => {
    if (!outputText || outputText === "Invalid Input") return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolWrapper
      title={mode === "textToBinary" ? "Text to Binary Converter" : "Binary to Text Converter"}
      description="Convert text into binary code or decode binary back into readable text format."
      categoryName="Dev Tools"
      categoryPath="/tools/dev"
      seoContent={
         <div>
             <h2>How to use the Converter</h2>
             <ol>
                 <li>Select your conversion mode at the top.</li>
                 <li>Paste your text or binary string into the input box.</li>
                 <li>The conversion is instant.</li>
             </ol>
             <p>This utility is processed client-side guaranteeing speed and data privacy.</p>
         </div>
      }
    >
      <div className="flex flex-col border-b border-border-base relative">
         <div className="flex items-center justify-between p-4 bg-bg-secondary border-b border-border-base">
             <div className="flex items-center gap-4 text-sm font-medium text-text-primary px-2">
                 <span className={mode === "textToBinary" ? "text-primary" : ""}>Text</span>
                 <button 
                    onClick={() => {
                        setMode(m => m === "textToBinary" ? "binaryToText" : "textToBinary");
                        setInputText(outputText === "Invalid Input" ? "" : outputText); // swap
                    }}
                    className="p-1.5 hover:bg-bg-tertiary rounded-full transition-colors focus:ring-2 focus:ring-primary"
                 >
                     <ArrowLeftRight className="size-4" />
                 </button>
                 <span className={mode === "binaryToText" ? "text-primary" : ""}>Binary</span>
             </div>
             <div className="flex gap-2">
                 <button onClick={() => setInputText("")} className="text-xs text-error font-medium hover:underline flex items-center gap-1">
                     <Trash2 className="size-3" /> Clear
                 </button>
             </div>
         </div>

         {/* Input Box */}
         <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === "textToBinary" ? "Enter text here..." : "Enter binary (01001000 01101001) here..."}
            className="w-full min-h-[150px] p-6 bg-bg-base text-text-primary resize-y focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/20 font-mono"
         />

         {/* Arrow Separator */}
         <div className="bg-bg-tertiary py-2 px-6 border-y border-border-base flex font-medium text-sm text-text-secondary items-center justify-between">
             Result
         </div>

         {/* Output Area */}
         <div className="bg-bg-base">
             <textarea
                readOnly
                value={outputText}
                placeholder="Conversion will appear here..."
                className="w-full h-[150px] p-6 bg-bg-secondary text-text-primary resize-none focus:outline-none font-mono"
             />
             <div className="flex justify-end gap-2 p-2 border-t border-border-base">
                 <button 
                    onClick={handleCopy}
                    disabled={!outputText || outputText === "Invalid Input"}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {copied ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Copy Output</>}
                </button>
             </div>
         </div>
      </div>
    </ToolWrapper>
  );
}
