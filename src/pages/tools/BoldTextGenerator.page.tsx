import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { ToolTextarea } from "@/components/shared/ToolTextarea";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle } from "lucide-react";

// Unicode math bold mapping
const boldCharMap: Record<string, string> = {
  'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 
  'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 
  'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
  'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 
  'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 
  'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
  '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
};

const toBoldText = (str: string) => {
  return str.split('').map(char => boldCharMap[char] || char).join('');
};

const SAMPLE_TEXT = "Hello World! Watch these words transform into thick, dark bold letters instantly.";

export function BoldTextGeneratorPage() {
  const [text, setText] = useState("");
  const result = toBoldText(text);

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bold-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "How does the Bold Text Generator work?",
      content: "It replaces standard characters with their Unicode Math Sans-Serif Bold equivalents. Since these are distinct Unicode characters rather than styled HTML elements, the bold formatting persists when you copy and paste it into other apps."
    },
    {
      title: "Where can I use bold Unicode text?",
      content: "You can paste this text anywhere that supports Unicode, including Twitter/X, Instagram bios, Facebook posts, Discord chat, and forum threads."
    },
    {
      title: "Can I use this for SEO and website content?",
      content: "We do not recommend using math bold Unicode characters for core website text because screen readers struggle to parse them properly (violating accessibility standards), and they do not carry the same semantic weight as a true HTML <strong> tag."
    }
  ];

  return (
    <ToolWrapper
      title="Bold Text Generator"
      description="Convert standard text into thick, heavy bold Unicode characters that you can copy and paste anywhere."
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
           <label className="text-sm font-semibold text-text-primary px-1">Bold Text Output</label>
           <ResultPanel
              content={result}
              empty={!text}
              emptyMessage="Type or paste your text on the left to see the bold text generated here."
              onDownload={result ? handleDownload : undefined}
           />
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Use the Bold Text Generator</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <p>Our tool instantly translates normal characters into bold equivalents utilizing Unicode symbols.</p>
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Paste or Type</strong> directly into the input area on the left.</li>
                 <li><strong>Real-time Conversion:</strong> The tool will instantly convert your characters on the right.</li>
                 <li><strong>Copy & Use:</strong> Extract the bold text and paste it into tweets, bios, or digital documents to add emphasis without needing rich-text editors.</li>
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

        <RelatedTools currentSlug="bold-text-generator" category="text" />
      </div>
    </ToolWrapper>
  );
}
