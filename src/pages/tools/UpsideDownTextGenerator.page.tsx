import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { ToolTextarea } from "@/components/shared/ToolTextarea";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle } from "lucide-react";

// Upside down mapping
const defaultMap: Record<string, string> = {
  a: '\u0250', b: 'q', c: '\u0254', d: 'p', e: '\u01DD', f: '\u025F', g: '\u0183', h: '\u0265', i: '\u0131', j: '\u027E',
  k: '\u029E', l: 'l', m: '\u026F', n: 'u', o: 'o', p: 'd', q: 'b', r: '\u0279', s: 's', t: '\u0287',
  u: 'n', v: '\u028C', w: '\u028D', x: 'x', y: '\u028E', z: 'z',
  A: '\u2200', B: 'q', C: '\u0186', D: 'p', E: '\u018E', F: '\u2132', G: '\u05E4', H: 'H', I: 'I', J: '\u017F',
  K: 'K', L: '\u02E1', M: 'W', N: 'N', O: 'O', P: '\u0500', Q: 'O', R: '\u1D1A', S: 'S', T: '\u22A5',
  U: '\u2229', V: '\u039B', W: 'M', X: 'X', Y: '\u2144', Z: 'Z',
  '1': '\u21C2', '2': '\u1105', '3': '\u0190', '4': '\u3123', '5': '\u03DB', '6': '9', '7': '\u3125', '8': '8', '9': '6', '0': '0',
  '.': '\u02D9', ',': "\'", '\'': ',', '"': '\u201E', '!': '\u00A1', '?': '\u00BF', '<': '>', '>': '<', '^': 'v', '&': '\u214B',
  '_': '\u203E', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '\u203F': '\u2040', '\u2045': '\u2046', '\u2234': '\u2235'
};

const toUpsideDown = (str: string) => {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    const char = str.charAt(i);
    result += defaultMap[char] || char;
  }
  return result;
};

const SAMPLE_TEXT = "Hello World! This text is going to be flipped upside down.";

export function UpsideDownTextGeneratorPage() {
  const [text, setText] = useState("");
  const result = toUpsideDown(text);

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "upside-down-text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "How does upside down text work?",
      content: "This tool takes every letter and replaces it with a Unicode character that looks like the upside-down version. It also reverses the entire string so that it acts like a mirror flip."
    },
    {
      title: "Can I use an upside down text on social media?",
      content: "Yes! Because the script uses special Unicode symbols rather than CSS styling, you can copy and paste the inverted text to Facebook, Twitter, Instagram, Discord, and essentially anywhere else on the web."
    },
    {
      title: "Why are some letters missing or not flipping?",
      content: "The Unicode character set does not have a perfect inverted duplicate for every letter or punctuation mark. The tool uses the closest visual equivalents available."
    }
  ];

  return (
    <ToolWrapper
      title="Upside Down Text Generator"
      description="Flip your text upside down instantly with Unicode characters. Copy and paste inverted text anywhere."
      categoryName="Text Tools"
      categoryPath="/tools/text"
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 p-6 bg-bg-base border-b border-border-base divide-y md:divide-y-0 md:divide-x divide-border-base">
        <div className="flex-1 w-full flex flex-col space-y-2 pb-6 md:pb-0 md:pr-4">
           <label className="text-sm font-semibold text-text-primary px-1">Normal Text</label>
           <ToolTextarea
             value={text}
             onChange={setText}
             onSample={() => setText(SAMPLE_TEXT)}
             onPaste={() => navigator.clipboard.readText().then(setText).catch(()=>alert("Clipboard access denied."))}
             onClear={() => setText("")}
           />
        </div>
        <div className="flex-1 w-full flex flex-col space-y-2 pt-6 md:pt-0 md:pl-4">
           <label className="text-sm font-semibold text-text-primary px-1">Upside Down Output</label>
           <ResultPanel
              content={result}
              empty={!text}
              emptyMessage="Type or paste your normal text on the left to see the flipped version here."
              onDownload={result ? handleDownload : undefined}
           />
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Flip Text Upside Down</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <p>Our tool instantly translates characters into upside-down Unicode symbols and reverses the string to create a true flipped effect.</p>
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Paste or Type</strong> normal text into the input area on the left.</li>
                 <li><strong>Real-time Flip:</strong> The tool reverses the string and swaps out letters mapping to their closest upside-down Unicode equivalents.</li>
                 <li><strong>Copy & Paste:</strong> You can take this text and put it into any chat, bio, or standard text field across almost any platform.</li>
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

        <RelatedTools currentSlug="upside-down-text-generator" category="text" />
      </div>
    </ToolWrapper>
  );
}
