import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Copy, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function RgbToHexPage() {
  const [r, setR] = useState<number | string>(255);
  const [g, setG] = useState<number | string>(87);
  const [b, setB] = useState<number | string>(34);

  const [hexInput, setHexInput] = useState<string>("#ff5722");

  const [copied, setCopied] = useState(false);

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return "#" + (toHex(r) + toHex(g) + toHex(b)).toUpperCase();
  };

  const hexToRgb = (hex: string) => {
    let cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split("").map(c => c + c).join("");
    }
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handleRgbChange = (color: 'r'|'g'|'b', value: string) => {
    const num = parseInt(value);
    
    let validNum = value === "" ? "" : isNaN(num) ? 0 : Math.min(255, Math.max(0, num));
    
    if (color === 'r') setR(validNum);
    if (color === 'g') setG(validNum);
    if (color === 'b') setB(validNum);

    const safeR = color === 'r' ? (validNum === "" ? 0 : validNum as number) : (r === "" ? 0 : r as number);
    const safeG = color === 'g' ? (validNum === "" ? 0 : validNum as number) : (g === "" ? 0 : g as number);
    const safeB = color === 'b' ? (validNum === "" ? 0 : validNum as number) : (b === "" ? 0 : b as number);

    setHexInput(rgbToHex(safeR, safeG, safeB));
  };

  const handleHexChange = (val: string) => {
    setHexInput(val);
    const rgb = hexToRgb(val);
    if (rgb) {
       setR(rgb.r);
       setG(rgb.g);
       setB(rgb.b);
    }
  };

  const safeHex = (() => {
     const rgb = hexToRgb(hexInput);
     return rgb ? hexInput.startsWith('#') ? hexInput : '#' + hexInput : '#000000';
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(safeHex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqItems = [
    {
      title: "What is RGB?",
      content: "RGB stands for Red, Green, and Blue. It's a color model used extensively in digital screens where colors are added together using light. Values range from 0 (none) to 255 (maximum intensity)."
    },
    {
      title: "What is a Hex color code?",
      content: "A Hex (hexadecimal) color code is a 6-symbol string commonly used in web design (HTML/CSS) to represent colors. It converts the RGB 0-255 numbers into base-16 math."
    },
    {
      title: "Does this tool work in reverse (Hex to RGB)?",
      content: "Yes! While primarily an RGB to Hex tool, if you type a Hex code into the output box, it will dynamically calculate the corresponding RGB values backwards."
    }
  ];

  return (
    <ToolWrapper
      title="RGB to Hex Converter"
      description="Convert Red Green Blue color codes into Hexadecimal format for web design instantly."
      categoryName="Image Tools"
      categoryPath="/tools/image"
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 p-6 bg-bg-base border-b border-border-base divide-y md:divide-y-0 md:divide-x divide-border-base">
        
        <div className="flex-1 w-full flex flex-col space-y-6 pb-6 md:pb-0 md:pr-4">
           <label className="text-sm font-semibold text-text-primary px-1">RGB Values</label>
           
           <div className="space-y-4 max-w-sm">
             <div className="flex items-center gap-4">
                <span className="w-8 font-bold text-error">R</span>
                <input 
                  type="number" 
                  min="0" max="255"
                  value={r} 
                  onChange={(e) => handleRgbChange('r', e.target.value)}
                  className="flex-1 px-4 py-2 border border-border-base rounded focus:ring-2 focus:ring-error focus:border-error bg-bg-base"
                />
             </div>
             <div className="flex items-center gap-4">
                <span className="w-8 font-bold text-success">G</span>
                <input 
                  type="number" 
                  min="0" max="255"
                  value={g} 
                  onChange={(e) => handleRgbChange('g', e.target.value)}
                  className="flex-1 px-4 py-2 border border-border-base rounded focus:ring-2 focus:ring-success focus:border-success bg-bg-base"
                />
             </div>
             <div className="flex items-center gap-4">
                <span className="w-8 font-bold text-info">B</span>
                <input 
                  type="number" 
                  min="0" max="255"
                  value={b} 
                  onChange={(e) => handleRgbChange('b', e.target.value)}
                  className="flex-1 px-4 py-2 border border-border-base rounded focus:ring-2 focus:ring-info focus:border-info bg-bg-base"
                />
             </div>
           </div>
        </div>
        
        <div className="flex flex-col items-center justify-center p-4">
            <ArrowRightLeft className="text-text-muted size-8 hidden md:block" />
        </div>

        <div className="flex-1 w-full flex flex-col space-y-6 pt-6 md:pt-0 md:pl-4">
           <label className="text-sm font-semibold text-text-primary px-1">Hex Code & Preview</label>
           
           <div className="space-y-6 w-full max-w-sm">
             <input 
               type="text" 
               value={hexInput}
               onChange={(e) => handleHexChange(e.target.value)}
               placeholder="#000000"
               maxLength={7}
               className="w-full text-center text-2xl tracking-widest uppercase font-mono px-4 py-4 border border-border-base rounded focus:ring-2 focus:ring-primary focus:border-primary bg-bg-base"
             />

             <div className="flex flex-col gap-3">
                 <div 
                   className="w-full h-24 rounded-lg border border-border-base shadow-inner transition-colors duration-200" 
                   style={{ backgroundColor: safeHex }}
                 />
                 <button
                    onClick={handleCopy}
                    className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                 >
                    {copied ? "✓ Copied" : <><Copy className="size-5" /> Copy Hex</>}
                 </button>
             </div>
           </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Convert RGB to Hex</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Input RGB:</strong> Enter the Red, Green, and Blue numeral values (ranging from 0 to 255) into the inputs on the left.</li>
                 <li><strong>Instant Math:</strong> The tool automatically performs base-16 conversions to compute the hexadecimal string instantly.</li>
                 <li><strong>Preview & Copy:</strong> Ensure the visual color swatch preview matches your expectations, then click copy to grab the code for your CSS stylesheet.</li>
             </ol>
          </div>
        </section>

        <section className="space-y-4">
           <div className="flex items-center gap-2">
             <HelpCircle className="size-5 text-primary" />
             <h2 className="text-xl font-bold text-text-primary">Frequently Asked Questions</h2>
           </div>
           <Accordion items={faqItems} />
        </section>

        <RelatedTools currentSlug="rgb-to-hex" category="image" />
      </div>
    </ToolWrapper>
  );
}
