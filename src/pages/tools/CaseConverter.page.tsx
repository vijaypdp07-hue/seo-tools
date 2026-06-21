import { useState } from "react";
import { Copy, Trash2, Wand2, Download, Check } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

const SAMPLE_TEXT = "hello world! this is a sample text. uppercase and lowercase conversion is easy!";

export function CaseConverterPage() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCaseChange = (caseType: string) => {
    switch (caseType) {
      case "upper":
        setText(text.toUpperCase());
        break;
      case "lower":
        setText(text.toLowerCase());
        break;
      case "title":
        setText(
          text.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          )
        );
        break;
      case "sentence":
        setText(
          text.replace(
            /(^\s*\w|[\.\!\?]\s*\w)/g,
            (c) => c.toUpperCase()
          )
        );
        break;
      case "alternate":
        setText(
          text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
        );
        break;
    }
  };

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
    a.download = "case-converter-result.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolWrapper
      title="Case Converter"
      description="Convert text to uppercase, lowercase, title case, sentence case, and more."
      categoryName="Text Tools"
      categoryPath="/tools/text"
      seoContent={
        <div>
            <h2>How to use the Case Converter</h2>
            <ol>
                <li>Paste your text into the input area.</li>
                <li>Click on any of the formatting buttons (Uppercase, Lowercase, etc.).</li>
                <li>The text will be instantly converted.</li>
                <li>Copy or download your formatted text.</li>
            </ol>
            <h3>Supported Cases</h3>
            <ul>
                <li><strong>Uppercase:</strong> CONVERTS ALL LETTERS TO UPPERCASE.</li>
                <li><strong>Lowercase:</strong> converts all letters to lowercase.</li>
                <li><strong>Title Case:</strong> Capitalizes The First Letter Of Each Word.</li>
                <li><strong>Sentence case:</strong> Capitalizes the first letter of each sentence.</li>
                <li><strong>aLtErNaTiNg cAsE:</strong> aLtErNaTeS bEtWeEn lOwErCaSe aNd uPpErCaSe.</li>
            </ul>
        </div>
      }
    >
      <div className="flex flex-col h-[500px]">
        {/* Input Actions */}
        <div className="flex items-center justify-between p-2 pb-0 bg-bg-secondary border-b border-border-base overflow-x-auto">
            <div className="flex gap-1">
                 <button 
                    onClick={() => navigator.clipboard.readText().then(setText).catch(()=>alert("Clipboard access denied."))}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-bg-tertiary rounded-md transition-colors whitespace-nowrap"
                >
                    <Copy className="size-4" /> <span className="hidden sm:inline">Paste</span>
                </button>
                <button 
                     onClick={() => setText(SAMPLE_TEXT)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-bg-tertiary rounded-md transition-colors whitespace-nowrap"
                >
                    <Wand2 className="size-4" /> <span className="hidden sm:inline">Sample</span>
                </button>
            </div>
            
             <button 
                 onClick={() => setText("")}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-error hover:bg-error-light rounded-md transition-colors whitespace-nowrap"
            >
                <Trash2 className="size-4" /> <span className="hidden sm:inline">Clear</span>
            </button>
        </div>

        {/* Real Textarea Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here to change its case..."
          className="flex-1 w-full p-6 bg-bg-base text-text-primary resize-none focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/20 placeholder:text-text-muted"
        />

        {/* Case Actions */}
        <div className="border-t border-border-base p-3 bg-bg-tertiary flex flex-wrap gap-2 justify-center">
            <button onClick={() => handleCaseChange("upper")} className="px-3 py-1.5 text-sm font-medium bg-bg-base border border-border-base rounded hover:border-primary hover:text-primary transition-colors">UPPERCASE</button>
            <button onClick={() => handleCaseChange("lower")} className="px-3 py-1.5 text-sm font-medium bg-bg-base border border-border-base rounded hover:border-primary hover:text-primary transition-colors">lowercase</button>
            <button onClick={() => handleCaseChange("title")} className="px-3 py-1.5 text-sm font-medium bg-bg-base border border-border-base rounded hover:border-primary hover:text-primary transition-colors">Title Case</button>
            <button onClick={() => handleCaseChange("sentence")} className="px-3 py-1.5 text-sm font-medium bg-bg-base border border-border-base rounded hover:border-primary hover:text-primary transition-colors">Sentence case.</button>
            <button onClick={() => handleCaseChange("alternate")} className="px-3 py-1.5 text-sm font-medium bg-bg-base border border-border-base rounded hover:border-primary hover:text-primary transition-colors">aLtErNaTiNg</button>
        </div>

        {/* Universal Output Actions */}
        <div className="border-t border-border-base p-2 bg-bg-secondary flex justify-end gap-2">
            <button 
                onClick={handleCopy}
                disabled={!text}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {copied ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Copy Text</>}
            </button>
            <button 
                onClick={handleDownload}
                disabled={!text}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Download className="size-4" /> Download
            </button>
        </div>
      </div>
    </ToolWrapper>
  );
}
