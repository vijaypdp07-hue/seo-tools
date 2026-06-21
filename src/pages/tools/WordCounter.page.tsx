import { useState, useMemo } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { ToolTextarea } from "@/components/shared/ToolTextarea";
import { ResultPanel } from "@/components/shared/ResultPanel";
import { StatsBar } from "@/components/shared/StatsBar";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle } from "lucide-react";

const SAMPLE_TEXT = `This is a sample text to demonstrate the word counter tool. It can instantly count words, characters, sentences, and paragraphs as you type!

Feel free to try pasting your own document, essay, or article here. The processing happens entirely in your browser, meaning your data remains private.`;

export function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return { words: 0, characters: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
    }

    const words = trimmed.split(/\s+/).filter(word => word.length > 0).length;
    const characters = text.length;
    const sentences = trimmed.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = trimmed.split(/\n+/).filter(para => para.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200);

    return { words, characters, sentences, paragraphs, readingTime };
  }, [text]);

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-counter-result.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "Is my text sent to a server?",
      content: "No, this tool operates entirely within your web browser. Your text never leaves your device."
    },
    {
      title: "How are words counted?",
      content: "We use standard whitespace splitting to identify individual words, similar to Microsoft Word."
    },
    {
      title: "Is there a character limit?",
      content: "Since the processing happens on your device, there is theoretically no limit, but extremely large texts (millions of words) might slow down your browser."
    }
  ];

  return (
    <ToolWrapper
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs instantly."
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
           <label className="text-sm font-semibold text-text-primary px-1">Output Text</label>
           <ResultPanel
              content={text}
              empty={!text}
              emptyMessage="Type or paste your text on the left, and see it mirrored here."
              onDownload={text ? handleDownload : undefined}
           />
        </div>
      </div>

      <div className="p-6 bg-bg-secondary border-b border-border-base">
        <StatsBar
          stats={[
            { label: "Words", value: stats.words },
            { label: "Characters", value: stats.characters },
            { label: "Sentences", value: stats.sentences },
            { label: "Paragraphs", value: stats.paragraphs },
          ]}
        />
      </div>

      <div className="p-6 md:p-8 space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Use Word Counter</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <p>Our online word counting utility is built to be fast, responsive, and completely private.</p>
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Paste or Type</strong> directly into the designated input area.</li>
                 <li><strong>Real-time Stats:</strong> Watch the statistics bar update dynamically below without any delay.</li>
                 <li><strong>Save & Export:</strong> Copy your validated text or download it right to your desktop.</li>
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

        <RelatedTools currentSlug="word-counter" category="text" />
      </div>
    </ToolWrapper>
  );
}
