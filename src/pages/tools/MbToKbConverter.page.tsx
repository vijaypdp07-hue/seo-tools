import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, ArrowRightLeft } from "lucide-react";

export function MbToKbConverterPage() {
  const [mb, setMb] = useState<number | string>(1);
  const [kb, setKb] = useState<number | string>(1024);

  const handleMbChange = (value: string) => {
    setMb(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setKb(+(num * 1024).toFixed(4));
    } else {
      setKb("");
    }
  };

  const handleKbChange = (value: string) => {
    setKb(value);
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setMb(+(num / 1024).toFixed(4));
    } else {
      setMb("");
    }
  };

  const faqItems = [
    {
      title: "How many KB are in a MB?",
      content: "In standard binary computing architecture, 1 Megabyte (MB) is equal to 1,024 Kilobytes (KB)."
    },
    {
      title: "Why is 1 MB sometimes 1000 KB?",
      content: "Storage manufacturers (like hard drive companies) sometimes use the decimal system where 1 MB = 1,000 KB. However, operating systems (like Windows, macOS) use the binary system where 1 MB = 1,024 KB. This tool uses the standard binary calculation (1024)."
    }
  ];

  return (
    <ToolWrapper
      title="MB to KB Converter"
      description="Convert Megabytes to Kilobytes instantly for storage calculations and file size limits."
      categoryName="Image Tools"
      categoryPath="/tools/image"
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 p-6 bg-bg-base border-b border-border-base divide-y md:divide-y-0 md:divide-x divide-border-base">
        
        <div className="flex-1 w-full flex flex-col items-center justify-center space-y-4 pb-6 md:pb-0 md:pr-4">
           <label className="text-sm font-semibold text-text-primary">Megabytes (MB)</label>
           <input 
              type="number" 
              value={mb} 
              onChange={(e) => handleMbChange(e.target.value)}
              className="w-full max-w-sm text-center text-4xl font-bold text-primary px-4 py-6 border border-border-base rounded focus:ring-2 focus:ring-primary focus:border-primary bg-bg-base"
           />
        </div>
        
        <div className="flex flex-col items-center justify-center p-4">
            <ArrowRightLeft className="text-text-muted size-8 hidden md:block" />
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-center space-y-4 pt-6 md:pt-0 md:pl-4">
           <label className="text-sm font-semibold text-text-primary">Kilobytes (KB)</label>
           <input 
              type="number" 
              value={kb} 
              onChange={(e) => handleKbChange(e.target.value)}
              className="w-full max-w-sm text-center text-4xl font-bold text-primary px-4 py-6 border border-border-base rounded focus:ring-2 focus:ring-primary focus:border-primary bg-bg-base"
           />
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Convert MB to KB</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Input Value:</strong> Type your Megabyte number into the left input box.</li>
                 <li><strong>See Result:</strong> The Kilobyte box on the right will instantly update with the exact multiple calculated via base-1024.</li>
             </ol>
             <p>This is especially helpful when dealing with file upload limits for Profile Pictures, PDF forms, and government applications which routinely limit sizes natively to arbitrary KB numbers (like 500 KB).</p>
          </div>
        </section>

        <section className="space-y-4">
           <div className="flex items-center gap-2">
             <HelpCircle className="size-5 text-primary" />
             <h2 className="text-xl font-bold text-text-primary">Frequently Asked Questions</h2>
           </div>
           <Accordion items={faqItems} />
        </section>

        <RelatedTools currentSlug="mb-to-kb-converter" category="image" />
      </div>
    </ToolWrapper>
  );
}
