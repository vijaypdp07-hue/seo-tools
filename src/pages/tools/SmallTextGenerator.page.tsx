import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { ToolTextarea } from "@/components/shared/ToolTextarea";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle } from "lucide-react";

// Subscript/Superscript mapping
const smallCharMap: Record<string, string> = {
  'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ᶦ', 'j': 'ʲ', 
  'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᵠ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 
  'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
  'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 
  'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'ᵠ', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ', 
  'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
};

const toSmallText = (str: string) => {
  return str.split('').map(char => smallCharMap[char] || char).join('');
};

const SAMPLE_TEXT = "Hello World! This is regular text that will be converted into small subscript-style characters.";

export function SmallTextGeneratorPage() {
  const [text, setText] = useState("");
  const result = toSmallText(text);

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "small-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "What is small text?",
      content: "Small text uses specific Unicode characters to render letters that appear significantly smaller than standard characters, similar to subscript or superscript."
    },
    {
      title: "Where can I use this small text?",
      content: "You can copy and paste this tiny text into social media profiles, chat messages (Discord, Facebook, WhatsApp), and forums to create unique usernames or emphasized words."
    },
    {
      title: "Why do some characters look normal?",
      content: "The Unicode standard doesn't have a reliable tiny equivalent for every single punctuation mark or special character, so some unsupported characters will remain unchanged."
    }
  ];

  return (
    <ToolWrapper
      title="Small Text Generator"
      description="Convert standard text into tiny Unicode characters (subscript and superscript) that you can copy and paste anywhere."
      categoryName="Text Tools"
      categoryPath="/tools/text"
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 p-6 bg-bg-base border-b border-border-base divide-y md:divide-y-0 md:divide-x divide-border-base">
        <div className="flex-1 w-full flex flex-col space-y-2 pb-6 md:pb-0 md:pr-4">
           <label className="text-sm font-semibold text-text-primary px-1">Input Text</label>
           <ToolTextarea
             value={text}
             onChange={setText}
             onSample={() => setText(SAMPLE_TEXT)}
             onPaste={() => navigator.clipboard.readText().then(setText).catch(()=>alert("Clipboard access denied."))}
             onClear={() => setText("")}
           />
        </div>
        <div className="flex-1 w-full flex flex-col space-y-2 pt-6 md:pt-0 md:pl-4">
           <label className="text-sm font-semibold text-text-primary px-1">Tiny Text Output</label>
           <ResultPanel
              content={result}
              empty={!text}
              emptyMessage="Type or paste your text on the left to see the tiny text generated here."
              onDownload={result ? handleDownload : undefined}
           />
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Generate Small Text</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <p>Our Small Text Generator instantly converts your standard words into tiny, hard-to-read (but very aesthetic) Unicode characters.</p>
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Paste or Type</strong> directly into the designated input area.</li>
                 <li><strong>Real-time Conversion:</strong> The engine will automatically replace standard characters with tiny Unicode equivalents.</li>
                 <li><strong>Copy & Use:</strong> Click the copy button and paste your tiny text onto Facebook, Twitter, Instagram, Discord, or anywhere else.</li>
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

        <RelatedTools currentSlug="small-text-generator" category="text" />
      </div>
    </ToolWrapper>
  );
}
