import { useState } from "react";
import { Download, Copy, RefreshCw, FileCode } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";
import * as prettier from "prettier/standalone";
import * as phpPlugin from "@prettier/plugin-php/standalone";

export function PhpFormatterPage() {
  const [phpCode, setPhpCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePhp = `<?php
    function helloWorld( $name ){
echo "Hello, "  . $name ;
  if($name=="Admin"){
      echo " Welcome back!";
  }
}
$user = "Admin";
helloWorld($user);
?>`;

  const handleFormat = async () => {
    if (!phpCode.trim()) {
      toast.error("Please enter PHP code to format.");
      return;
    }

    setIsProcessing(true);
    try {
      const formatted = await prettier.format(phpCode, {
        parser: "php",
        plugins: [phpPlugin as any],
        tabWidth: 4,
        singleQuote: true,
      });

      setFormattedCode(formatted);
      toast.success("PHP code formatted successfully!");
    } catch (error: any) {
      console.error("Format error", error);
      toast.error(error.message || "Invalid PHP code. Unable to format.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!formattedCode) return;
    navigator.clipboard.writeText(formattedCode);
    toast.success("Formatted code copied to clipboard!");
  };

  const handleDownload = () => {
    if (!formattedCode) return;
    const blob = new Blob([formattedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.php";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ToolWrapper
      title="PHP Formatter"
      description="Format and beautify your PHP code instantly in the browser. Makes unreadable code clean and properly indented."
      categoryName="Dev Tools"
      categoryPath="/tools/dev"
    >
      <div className="flex flex-col gap-6 p-6 md:p-8 bg-bg-base border-b border-border-base min-h-[500px]">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="space-y-4 flex flex-col h-full">
            <div className="flex items-center justify-between">
              <label className="font-bold text-text-primary text-sm uppercase tracking-wider">Input PHP</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPhpCode(samplePhp)}
                  className="text-xs px-3 py-1 bg-bg-secondary hover:bg-border-base text-text-secondary rounded-md transition-colors"
                >
                  Sample
                </button>
                <button
                  onClick={() => {
                    setPhpCode("");
                    setFormattedCode("");
                  }}
                  className="text-xs px-3 py-1 bg-bg-secondary hover:bg-border-base text-text-secondary rounded-md"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <textarea
              className="flex-1 min-h-[400px] w-full p-4 bg-bg-secondary border border-border-base rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary font-mono text-sm resize-none"
              placeholder="Paste your unformatted PHP code here... (start with <?php)"
              value={phpCode}
              onChange={(e) => setPhpCode(e.target.value)}
            />
            
            <button
               onClick={handleFormat}
               disabled={isProcessing || !phpCode}
               className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-tool disabled:opacity-70 disabled:cursor-not-allowed"
            >
               <RefreshCw className={`size-5 ${isProcessing ? 'animate-spin' : ''}`} />
               {isProcessing ? 'Formatting...' : 'Format PHP Code'}
            </button>
          </div>

          <div className="space-y-4 flex flex-col h-full">
            <div className="flex items-center justify-between h-[28px]">
              <label className="font-bold text-text-primary text-sm uppercase tracking-wider">Formatted Output</label>
              {formattedCode && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="text-xs flex items-center gap-1 px-3 py-1 bg-bg-secondary hover:bg-border-base text-text-secondary rounded-md transition-colors"
                  >
                    <Copy className="size-3" /> Copy
                  </button>
                  <button
                    onClick={handleDownload}
                    className="text-xs flex items-center gap-1 px-3 py-1 bg-info text-white hover:bg-info/90 rounded-md transition-colors"
                  >
                    <Download className="size-3" /> Download
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 min-h-[400px] bg-bg-secondary border border-border-base rounded-xl relative overflow-hidden flex flex-col">
              {!formattedCode ? (
                <div className="flex-1 flex flex-col items-center justify-center text-text-muted space-y-3 p-8 text-center">
                  <FileCode className="size-12 opacity-20" />
                  <p>Formatted PHP code will appear here</p>
                </div>
              ) : (
                <textarea
                  readOnly
                  className="w-full h-full p-4 bg-transparent focus:outline-none text-text-primary font-mono text-sm resize-none"
                  value={formattedCode}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </ToolWrapper>
  );
}
