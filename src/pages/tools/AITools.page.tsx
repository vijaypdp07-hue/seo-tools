import { Link } from "react-router-dom";
import { Sparkles, Edit3, SpellCheck, FileText, CheckCircle, Search, Mail, BookOpen, PenTool, Type } from "lucide-react";

export function AIToolsPage() {
  const tools = [
    { name: "Plagiarism Checker", icon: Search, path: "/tools/ai/plagiarism-checker", desc: "Coming soon." },
    { name: "Article Rewriter", icon: Edit3, path: "/tools/ai/article-rewriter", desc: "Rewrite articles using AI." },
    { name: "Free Grammar Checker", icon: SpellCheck, path: "/tools/ai/grammar-checker", desc: "Check grammar automatically." },
    { name: "Spell Checker", icon: SpellCheck, path: "/tools/ai/spell-checker", desc: "Advanced spelling correction." },
    { name: "Paraphrasing Tool", icon: Edit3, path: "/tools/ai/paraphraser", desc: "Paraphrase sentences instantly." },
    { name: "AI Paragraph Generator", icon: FileText, path: "/tools/ai/paragraph-generator", desc: "Generate paragraphs from prompts." },
    { name: "Title Generator", icon: Type, path: "/tools/ai/title-generator", desc: "Generate catchy titles." },
    { name: "Text Summarizer", icon: FileText, path: "/tools/ai/summarizer", desc: "Summarize long texts." },
    { name: "AI Email Writer", icon: Mail, path: "/tools/ai/email-writer", desc: "Draft professional emails." },
    { name: "AI Story Generator", icon: BookOpen, path: "/tools/ai/story-generator", desc: "Write creative stories." },
    { name: "AI Content Detector", icon: Search, path: "/tools/ai/content-detector", desc: "Detect AI generated content." },
    { name: "AI Humanizer", icon: CheckCircle, path: "/tools/ai/humanizer", desc: "Make AI text sound more human." },
    { name: "AI Essay Writer", icon: PenTool, path: "/tools/ai/essay-writer", desc: "Coming soon." },
    { name: "AI Writer", icon: PenTool, path: "/tools/ai/ai-writer", desc: "General-purpose AI writing assistant." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          AI Text & Writing Tools
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Leverage the power of generative AI to write, rewrite, summarize, and analyze text instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.name}
              to={tool.path}
              className="group flex flex-col items-center text-center p-6 bg-bg border border-border rounded-xl hover:border-primary/50 hover:shadow-tool transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {tool.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
