import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { ToolTextarea } from "@/components/shared/ToolTextarea";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle } from "lucide-react";

// Subscript/Superscript mapping matching small caps closely
const smallCapsMap: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ',
  k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ꞯ', r: 'ʀ', s: 's', t: 'ᴛ',
  u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
};

const toSmallCaps = (str: string) => {
  return str.split('').map(char => smallCapsMap[char.toLowerCase()] || char).join('');
};

const SAMPLE_TEXT = "Hello World! This normal text will be converted to aesthetic small caps formatting.";

export function SmallCapsGeneratorPage() {
  const [text, setText] = useState("");
  const result = toSmallCaps(text);

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "small-caps.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "What are small caps?",
      content: "Small caps are typographic characters formatted as lowercase letters, but their exact form resembles uppercase (capital) letters, appearing smaller in height."
    },
    {
      title: "Will this work in CSS headers on websites?",
      content: "For full website body text, you should use native CSS property `font-variant: small-caps;` instead. This tool is best used when you want a portable small-caps string to paste into places where you CANNOT edit HTML/CSS, like chat platforms or social bios."
    },
    {
      title: "Why are some letters not styled properly?",
      content: "The Unicode character database doesn't have an officially dedicated small capitals block for the entire alphabet, so the tool uses phonetic extensions and closest visual matches."
    }
  ];

  return (
    <ToolWrapper
      title="Small Caps Generator"
      description="Convert your normal text into uppercase characters with a lowercase height size (Sᴍᴀʟʟ Cᴀᴘꜱ). Copypaste everywhere."
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
           <label className="text-sm font-semibold text-text-primary px-1">Small Caps Text Output</label>
           <ResultPanel
              content={result}
              empty={!text}
              emptyMessage="Type or paste your text on the left to see the small caps text generated here."
              onDownload={result ? handleDownload : undefined}
           />
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Generate Small Caps</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <p>Our Small Caps Generator takes your standard font text and produces a stylized version where capitalized letters mimic standard uppercase boundaries while the lowercase text turns into smaller uppercase figures.</p>
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Paste or Type</strong> directly into the designated input area.</li>
                 <li><strong>Real-time Conversion:</strong> The mathematical engine replaces alphabet characters with their phonetic small equivalent dynamically mapping via Unicode.</li>
                 <li><strong>Copy & Use:</strong> Take the Sᴍᴀʟʟ Cᴀᴘꜱ out via the copy button. Paste into headers, tweets, documents, and discord.</li>
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

        <RelatedTools currentSlug="small-caps-generator" category="text" />
      </div>
    </ToolWrapper>
  );
}
