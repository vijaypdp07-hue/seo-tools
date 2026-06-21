import { useState } from "react";
import { Copy, Trash2, Wand2 } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function KeywordsDensityCheckerPage() {
  const [inputText, setInputText] = useState("");

  const analyzetext = (text: string) => {
    if (!text.trim()) return [];
    
    // Convert to lowercase, remove punctuation except hyphens/apostrophes within words
    const words = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 0);
      
    if (words.length === 0) return [];
    
    const wordCount = words.length;
    const frequencyInfo: Record<string, number> = {};
    
    for (const word of words) {
        frequencyInfo[word] = (frequencyInfo[word] || 0) + 1;
    }
    
    const densityArray = Object.keys(frequencyInfo).map(word => {
        const count = frequencyInfo[word];
        return {
            word,
            count,
            density: (count / wordCount) * 100
        };
    }).sort((a, b) => b.count - a.count).slice(0, 50); // top 50 
    
    return densityArray;
  };

  const results = analyzetext(inputText);

  const handleClear = () => {
     setInputText("");
  };

  const handleSample = () => {
      setInputText("SEO tools are a great way to improve your website's visibility. A good SEO strategy requires using the right SEO tools to analyze keywords. SEO isn't just about tools, but tools make SEO much easier.");
  };

  return (
    <ToolWrapper
      title="Keywords Density Checker"
      description="Analyze the frequency and density of words in your text or content."
      categoryName="Website Tools"
      categoryPath="/tools/website"
      seoContent={
        <div>
          <h2>What is Keyword Density?</h2>
          <p>Keyword density tells you how often a search term appears in a text in relation to the total number of words it contains.</p>
          <ol>
            <li>Paste your article or text into the input box.</li>
            <li>Our tool instantly calculates how many times each word is used.</li>
            <li>View the percentage density to ensure you're not over-optimizing (keyword stuffing).</li>
          </ol>
          <p>This checks the word combinations instantaneously inside your browser. No strings are uploaded.</p>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border-base bg-bg-base border-b border-border-base relative">
         <div className="w-full md:w-[60%] flex flex-col min-h-full">
            <div className="flex items-center justify-between p-4 bg-bg-secondary border-b border-border-base">
                <span className="text-sm font-medium text-text-primary px-2">Paste Content</span>
                <div className="flex gap-2">
                    <button onClick={handleSample} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                        <Wand2 className="size-3" /> Sample
                    </button>
                    <button onClick={handleClear} className="text-xs text-error font-medium hover:underline flex items-center gap-1">
                        <Trash2 className="size-3" /> Clear
                    </button>
                </div>
            </div>
            
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your article or text here to see keyword density..."
                className="flex-1 w-full p-6 bg-bg-base text-text-primary resize-y focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/20 min-h-[300px]"
            />
         </div>
         <div className="w-full md:w-[40%] bg-bg-secondary flex flex-col">
            <div className="flex items-center justify-between p-4 bg-bg-secondary border-b border-border-base">
                <span className="text-sm font-medium text-text-primary px-2">Analysis Results</span>
            </div>
            <div className="p-4 flex-1 overflow-auto max-h-[500px]">
                {results.length > 0 ? (
                    <table className="w-full text-left text-sm text-text-secondary border-collapse">
                        <thead className="bg-bg-tertiary text-text-primary sticky top-0">
                            <tr>
                                <th className="p-3 border-b border-border-base rounded-tl-md font-semibold">Keyword</th>
                                <th className="p-3 border-b border-border-base font-semibold">Count</th>
                                <th className="p-3 border-b border-border-base rounded-tr-md font-semibold">Density</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-base bg-bg-base border-x border-b border-border-base rounded-b-md">
                            {results.map((item, index) => (
                                <tr key={index} className="hover:bg-bg-secondary transition-colors">
                                    <td className="p-3 font-medium text-text-primary max-w-[200px] truncate">{item.word}</td>
                                    <td className="p-3">{item.count}</td>
                                    <td className="p-3 font-mono">{item.density.toFixed(2)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-text-muted h-full space-y-3 mt-12">
                        <div className="p-3 rounded-full bg-bg-tertiary">
                            <Wand2 className="size-6" />
                        </div>
                        <p className="text-sm">Type or paste text to see keyword density analysis here.</p>
                    </div>
                )}
            </div>
         </div>
      </div>
    </ToolWrapper>
  );
}
