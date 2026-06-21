import { useState } from "react";
import { Copy, Trash2, Wand2, ArrowLeftRight, Check } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";

const MORSE_MAP: Record<string, string> = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....',
  i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.',
  q: '--.-', r: '.-.', s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
  y: '-.--', z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

const REVERSE_MORSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([key, value]) => [value, key])
);

export function MorseCodeTranslatorPage() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState<"textToMorse" | "morseToText">("textToMorse");
  const [copied, setCopied] = useState(false);

  const translate = (text: string, currentMode: "textToMorse" | "morseToText"): string => {
      if (!text) return "";

      if (currentMode === "textToMorse") {
          const words = text.toLowerCase().split(/\s+/);
          return words.map(word => 
              word.split('').map(char => MORSE_MAP[char] || char).join(' ')
          ).join(' / ');
      } else {
          const words = text.split(/\s+\/\s+/);
          return words.map(word => 
              word.split(/\s+/).map(char => REVERSE_MORSE_MAP[char] || char).join('')
          ).join(' ').toUpperCase();
      }
  };

  const outputText = translate(inputText, mode);

  const toggleMode = () => {
      setMode(m => m === "textToMorse" ? "morseToText" : "textToMorse");
      setInputText(outputText); // Swap content
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolWrapper
      title="Morse Code Translator"
      description="Translate text to Morse code and decode Morse code back to text."
      categoryName="Text Tools"
      categoryPath="/tools/text"
      seoContent={
        <div>
            <h2>How to use the Morse Code Translator</h2>
            <ol>
                <li>Select the translation direction (Text to Morse or Morse to Text).</li>
                <li>Type or paste your input into the top area.</li>
                <li>The translation will appear instantly in the result area below.</li>
                <li>Click the swap button to reverse the translation direction and swap the text.</li>
            </ol>
            <p><strong>Note:</strong> In Morse code, spaces between letters are represented by a single space, and spaces between words are represented by a forward slash (/).</p>
        </div>
      }
    >
      <div className="flex flex-col border-b border-border-base relative">
         <div className="flex items-center justify-between p-4 bg-bg-secondary border-b border-border-base">
             <div className="flex items-center gap-4 text-sm font-medium text-text-primary px-2">
                 <span className={mode === "textToMorse" ? "text-primary" : ""}>Text</span>
                 <button 
                    onClick={toggleMode}
                    className="p-1.5 hover:bg-bg-tertiary rounded-full transition-colors focus:ring-2 focus:ring-primary"
                    aria-label="Swap translation direction"
                 >
                     <ArrowLeftRight className="size-4" />
                 </button>
                 <span className={mode === "morseToText" ? "text-primary" : ""}>Morse Code</span>
             </div>
             <div className="flex gap-2">
                 <button onClick={() => setInputText(mode === "textToMorse" ? "SOS" : "... --- ...")} className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                     <Wand2 className="size-3" /> Sample
                 </button>
                 <button onClick={() => setInputText("")} className="text-xs text-error font-medium hover:underline flex items-center gap-1">
                     <Trash2 className="size-3" /> Clear
                 </button>
             </div>
         </div>

         {/* Input Box */}
         <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === "textToMorse" ? "Enter text to translate..." : "Enter morse code to decode (use / for word spaces)..."}
            className="w-full min-h-[150px] p-6 bg-bg-base text-text-primary resize-y focus:outline-none focus:ring-inset focus:ring-2 focus:ring-primary/20 placeholder:text-text-muted"
         />

         {/* Arrow Separator */}
         <div className="bg-bg-tertiary py-2 px-6 border-y border-border-base flex font-medium text-sm text-text-secondary items-center justify-between">
             Translation Result
         </div>

         {/* Output Area */}
         <div className="bg-bg-base">
             <textarea
                readOnly
                value={outputText}
                placeholder="Translation will appear here..."
                className="w-full h-[150px] p-6 bg-bg-secondary text-text-primary resize-none focus:outline-none font-mono"
             />
             <div className="flex justify-end gap-2 p-2 border-t border-border-base">
                 <button 
                    onClick={handleCopy}
                    disabled={!outputText}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white hover:bg-primary-dark rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {copied ? <><Check className="size-4" /> Copied!</> : <><Copy className="size-4" /> Copy Output</>}
                </button>
             </div>
         </div>
      </div>
    </ToolWrapper>
  );
}
