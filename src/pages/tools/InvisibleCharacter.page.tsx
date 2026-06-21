import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { ToolTextarea } from "@/components/shared/ToolTextarea";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle } from "lucide-react";

// Invisible characters array
const invisibleChars = [
  { name: "Zero Width Space", char: "\u200B", desc: "No visible width, breaks lines." },
  { name: "Zero Width Non-Joiner", char: "\u200C", desc: "Prevents ligatures." },
  { name: "Zero Width Joiner", char: "\u200D", desc: "Forces ligatures or emoji combinations." },
  { name: "Braille Pattern Blank", char: "\u2800", desc: "A blank character the same width as standard braille dots." },
  { name: "Hangul Filler", char: "\u3164", desc: "Often used to send blank messages in gaming/chat contexts." },
];

export function InvisibleCharacterPage() {
  const [selectedChar, setSelectedChar] = useState(invisibleChars[0]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedChar.char);
  };

  const faqItems = [
    {
      title: "What is an invisible character?",
      content: "An invisible character (like a zero-width space or an empty Braille pattern) acts like a space in terms of code but takes up either zero physical space or very distinct physical space on rendering without actually displaying any glyph."
    },
    {
      title: "What are empty characters used for?",
      content: "They are commonly used by people to set 'empty' display names, send blank messages in chat applications (e.g. Discord, WhatsApp), or trick form validators that require you to type something into a required field."
    },
    {
      title: "Which invisible character should I use?",
      content: "For a blank gaming name or Discord message, the 'Hangul Filler' or 'Braille Pattern Blank' usually work best. For formatting line breaks invisibly, use the 'Zero Width Space'."
    }
  ];

  return (
    <ToolWrapper
      title="Invisible Character Generator"
      description="Copy empty, transparent Unicode characters to use for blank messages, empty names, and spacing hacks."
      categoryName="Text Tools"
      categoryPath="/tools/text"
    >
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 p-6 bg-bg-base border-b border-border-base divide-y md:divide-y-0 md:divide-x divide-border-base">
        <div className="flex-1 w-full flex flex-col space-y-4 pb-6 md:pb-0 md:pr-4">
           <h3 className="text-lg font-bold text-text-primary">Select Character Type</h3>
           
           <div className="grid grid-cols-1 rounded-xl overflow-hidden border border-border-base divide-y divide-border-base bg-bg-base">
              {invisibleChars.map((char) => (
                <button
                  key={char.name}
                  onClick={() => setSelectedChar(char)}
                  className={`p-4 text-left transition-colors flex flex-col ${selectedChar.name === char.name ? 'bg-primary-light/50 border-l-4 border-l-primary' : 'hover:bg-bg-secondary border-l-4 border-l-transparent'}`}
                >
                  <span className={`font-semibold ${selectedChar.name === char.name ? 'text-primary' : 'text-text-primary'}`}>{char.name}</span>
                  <span className="text-sm text-text-secondary mt-1">{char.desc}</span>
                </button>
              ))}
           </div>
        </div>

        <div className="flex-1 w-full flex flex-col space-y-6 pt-6 md:pt-0 md:pl-4">
           <h3 className="text-lg font-bold text-text-primary">Output Character</h3>
           
           <div className="p-10 border-2 border-dashed border-border-focus rounded-xl bg-bg-secondary flex flex-col items-center justify-center text-center space-y-6 min-h-[250px]">
              <div className="text-sm border border-border-base px-3 py-1 rounded bg-bg-base text-text-muted">
                Character: &quot;{selectedChar.char}&quot; (Invisible)
              </div>
              <p className="text-text-primary font-medium max-w-sm">
                Click below to copy your invisible <strong className="text-primary">{selectedChar.name}</strong> character to your clipboard.
              </p>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark shadow-md hover:shadow-lg transition-all"
              >
                Copy to Clipboard
              </button>
           </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">About Empty Unicode Spaces</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <p>Computers require character data to recognize a text input field as &quot;filled&quot; or not empty. A spacebar space is often stripped by chat filters or form validators. That's why having access to alternate Unicode spacing hacks is extremely useful for generating an empty name.</p>
             <p>Whether you need an empty bio, a completely blank tweet, or an invisible Discord name, copying these unique empty unicode variants will bypass generic character filters easily.</p>
          </div>
        </section>

        <section className="space-y-4">
           <div className="flex items-center gap-2">
             <HelpCircle className="size-5 text-primary" />
             <h2 className="text-xl font-bold text-text-primary">Frequently Asked Questions</h2>
           </div>
           <Accordion items={faqItems} />
        </section>

        <RelatedTools currentSlug="invisible-character" category="text" />
      </div>
    </ToolWrapper>
  );
}
