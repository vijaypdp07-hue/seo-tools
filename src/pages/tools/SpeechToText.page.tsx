import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Copy, Trash2, Check, AlertTriangle } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function SpeechToTextPage() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [copied, setCopied] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
          setText(prev => prev ? prev + ' ' + finalTranscript : finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
          toast.error("Microphone access denied.");
      } else {
          toast.error("An error occurred during speech recognition.");
      }
    };

    recognition.onend = () => {
        // Only if we explicitly turned it off do we keep it off
        // Otherwise, continuous mode should persist but sometimes browser halts it.
        setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };
  }, []);

  const toggleListen = () => {
      if (isListening) {
          recognitionRef.current?.stop();
          setIsListening(false);
      } else {
          try {
              recognitionRef.current?.start();
              setIsListening(true);
          } catch (err) {
              // already started
          }
      }
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Text copied!");
  };

  if (!isSupported) {
      return (
          <ToolWrapper
              title="Speech to Text"
              description="Convert your spoken words into written text seamlessly in your browser."
              categoryName="Text Tools"
              categoryPath="/tools/text"
          >
              <div className="p-8 text-center bg-bg-base border-b border-border-base min-h-[400px] flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 rounded-full bg-error-light text-error">
                      <AlertTriangle className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">Unsupported Browser feature</h3>
                  <p className="text-text-secondary max-w-md">
                      Your current browser does not support the Web Speech API required for this tool. 
                      Try using Google Chrome, Microsoft Edge, or Safari for the best experience.
                  </p>
              </div>
          </ToolWrapper>
      );
  }

  return (
    <ToolWrapper
      title="Speech to Text"
      description="Convert your spoken words into written text seamlessly in your browser."
      categoryName="Text Tools"
      categoryPath="/tools/text"
      seoContent={
          <div>
            <h2>How to use Speech to Text</h2>
            <ol>
               <li>Connect your microphone and allow browser permissions when prompted.</li>
               <li>Click the "Start Listening" button.</li>
               <li>Speak clearly into your microphone, and your words will instantly appear in the text box.</li>
               <li>Click "Stop Listening" and copy your final text.</li>
            </ol>
            <p>Our Dictation tool uses your browser's built-in Web Speech API, meaning your audio is securely transcribed without uploading files to our servers.</p>
          </div>
      }
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="flex items-center justify-between p-4 bg-bg-secondary border-b border-border-base">
              <span className="text-sm font-medium text-text-primary px-2">Voice Dictation</span>
              <div className="flex gap-2">
                  <button onClick={() => setText("")} className="text-xs text-error font-medium hover:underline flex items-center gap-1">
                      <Trash2 className="size-3" /> Clear
                  </button>
                  <button 
                      onClick={handleCopy}
                      disabled={!text}
                      className="text-xs text-primary font-medium hover:underline flex items-center gap-1 disabled:opacity-50"
                  >
                      {copied ? <Check className="size-3" /> : <Copy className="size-3" />} Copy
                  </button>
              </div>
          </div>
          
          <div className="flex-1 w-full bg-bg-base relative flex flex-col">
              <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Click the microphone to start speaking. Your text will appear here..."
                  className="flex-1 w-full p-6 bg-transparent text-text-primary resize-none focus:outline-none focus:ring-inset focus:ring-1 focus:ring-border-focus text-lg leading-relaxed min-h-[300px]"
              />
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                  <button
                      onClick={toggleListen}
                      className={`flex items-center justify-center size-16 rounded-full shadow-lg transition-all ${isListening ? 'bg-error hover:bg-error/90 animate-pulse' : 'bg-primary hover:bg-primary-dark'}`}
                      title={isListening ? "Stop Listening" : "Start Listening"}
                  >
                      {isListening ? <MicOff className="size-8 text-white" /> : <Mic className="size-8 text-white" />}
                  </button>
                  <span className={`text-sm font-medium px-4 py-1 rounded-full ${isListening ? 'bg-error-light text-error shadow-sm' : 'text-text-muted bg-bg-secondary border border-border-base'}`}>
                      {isListening ? "Listening... Speak now" : "Click to start recording"}
                  </span>
              </div>
          </div>
      </div>
    </ToolWrapper>
  );
}
