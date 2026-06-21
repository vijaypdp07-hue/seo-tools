import { Link } from "react-router-dom";
import { FileText, Type, ListPlus, ArrowLeftRight, ChevronRight, Image as ImageIcon, Bold, Space, SpellCheck } from "lucide-react";

export function TextToolsPage() {
  const tools = [
    { name: "Word Counter", icon: FileText, path: "/tools/text/word-counter", desc: "Count words, characters, sentences, and paragraphs instantly." },
    { name: "Case Converter", icon: Type, path: "/tools/text/case-converter", desc: "Convert text to uppercase, lowercase, title case, and more." },
    { name: "Word Combiner", icon: ListPlus, path: "/tools/text/word-combiner", desc: "Merge lines or lists of words easily." },
    { name: "Reverse Text", icon: ArrowLeftRight, path: "/tools/text/reverse-text", desc: "Reverse strings, words, or letters instantly." },
    { name: "Online Notepad", icon: FileText, path: "/tools/text/online-notepad", desc: "A simple, auto-saving online notepad directly in your browser." },
    { name: "Online Text Editor", icon: SpellCheck, path: "/tools/text/online-text-editor", desc: "A quick, lightweight browser-based text editor." },
    { name: "Morse Code Translator", icon: Type, path: "/tools/text/morse-code-translator", desc: "Translate text to Morse code and decode Morse code back to text." },
    { name: "Text to Image", icon: ImageIcon, path: "/tools/text/text-to-image", desc: "Convert text or quotes into beautiful, downloadable images." },
    { name: "Small Text Generator", icon: Type, path: "/tools/text/small-text-generator", desc: "Convert regular text into tiny superscript or subscript characters." },
    { name: "Small Caps Generator", icon: Type, path: "/tools/text/small-caps-generator", desc: "Convert regular text into elegant small capitals." },
    { name: "Bold Text Generator", icon: Bold, path: "/tools/text/bold-text-generator", desc: "Generate bold characters suitable for social media profiles." },
    { name: "Upside Down Text Generator", icon: ArrowLeftRight, path: "/tools/text/upside-down-text-generator", desc: "Flip your text completely upside down." },
    { name: "Invisible Character", icon: Space, path: "/tools/text/invisible-character", desc: "Copy an empty/invisible character for names and statuses." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <nav aria-label="breadcrumb" className="flex items-center text-sm text-text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="size-4 mx-1" />
        <span className="text-text-primary font-medium" aria-current="page">Text Tools</span>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <FileText className="size-8 text-primary" />
          Text Tools
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          A complete suite of free text processing tools. Format, convert, and manipulate text strings right in your browser. No data is sent to our servers.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.name}
              to={tool.path}
              className="group flex flex-col p-6 rounded-xl border border-border-base bg-bg-base hover:shadow-tool hover:border-border-focus transition-all duration-200"
            >
              <div className="size-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-text-secondary flex-1">
                {tool.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
