import { useState, useRef } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { Accordion } from "@/components/shared/Accordion";
import { BookOpen, HelpCircle, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, Download } from "lucide-react";

export function OnlineTextEditorPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleDownload = () => {
    if (!editorRef.current) return;
    const content = editorRef.current.innerHTML;
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqItems = [
    {
      title: "Is my document saved?",
      content: "This tool does not save your document to any server. If you refresh the page, the content will be lost. Make sure to download your file as HTML when finished."
    },
    {
      title: "Is this a WYSIWYG editor?",
      content: "Yes, it is a basic What You See Is What You Get (WYSIWYG) editor using the browser's native contenteditable API."
    },
    {
      title: "How do I print the document?",
      content: "You can simply use your browser's print shortcut (Ctrl+P or Cmd+P) after clicking inside the editor to print the document."
    }
  ];

  return (
    <ToolWrapper
      title="Online Text Editor"
      description="A rich text editor directly in your web browser. Edit, format, and download HTML documents locally."
      categoryName="Text Tools"
      categoryPath="/tools/text"
    >
      <div className="flex flex-col border border-border-base rounded-md overflow-hidden bg-bg-base">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-bg-secondary border-b border-border-base">
          <button onClick={() => execCommand("bold")} className="p-2 hover:bg-bg-tertiary rounded text-text-secondary hover:text-primary transition-colors" title="Bold">
             <Bold className="size-4" />
          </button>
          <button onClick={() => execCommand("italic")} className="p-2 hover:bg-bg-tertiary rounded text-text-secondary hover:text-primary transition-colors" title="Italic">
             <Italic className="size-4" />
          </button>
          <button onClick={() => execCommand("underline")} className="p-2 hover:bg-bg-tertiary rounded text-text-secondary hover:text-primary transition-colors" title="Underline">
             <Underline className="size-4" />
          </button>
          
          <div className="w-px h-6 bg-border-base mx-1"></div>
          
          <button onClick={() => execCommand("justifyLeft")} className="p-2 hover:bg-bg-tertiary rounded text-text-secondary hover:text-primary transition-colors" title="Align Left">
             <AlignLeft className="size-4" />
          </button>
          <button onClick={() => execCommand("justifyCenter")} className="p-2 hover:bg-bg-tertiary rounded text-text-secondary hover:text-primary transition-colors" title="Center">
             <AlignCenter className="size-4" />
          </button>
          <button onClick={() => execCommand("justifyRight")} className="p-2 hover:bg-bg-tertiary rounded text-text-secondary hover:text-primary transition-colors" title="Align Right">
             <AlignRight className="size-4" />
          </button>

          <div className="w-px h-6 bg-border-base mx-1"></div>

          <button onClick={() => execCommand("insertUnorderedList")} className="p-2 hover:bg-bg-tertiary rounded text-text-secondary hover:text-primary transition-colors" title="Bullet List">
             <List className="size-4" />
          </button>
        </div>

        {/* Editor Area */}
        <div 
          ref={editorRef}
          contentEditable 
          className="p-6 min-h-[400px] w-full bg-white text-gray-900 focus:outline-none prose max-w-none"
          placeholder="Start writing your document here..."
        />
        
        {/* Footer Actions */}
        <div className="border-t border-border-base p-2 bg-bg-secondary flex justify-end gap-2">
            <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border-base bg-bg-base text-text-primary hover:bg-bg-secondary hover:border-primary rounded-md transition-colors"
            >
                <Download className="size-4" /> Download HTML
            </button>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-12 mt-8 border border-border-base rounded-md">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h2 className="text-xl font-bold text-text-primary">How to Use the Online Text Editor</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary">
             <p>Our Online Text Editor lets you draft basic rich-text documents quickly without launching heavy software like Microsoft Word.</p>
             <ol className="space-y-2 marker:text-primary">
                 <li><strong>Click and Type:</strong> Use the blank canvas area to start drafting your content.</li>
                 <li><strong>Format text:</strong> Highlight text and use the format bar above (Bold, Italic, alignment) to style it.</li>
                 <li><strong>Export:</strong> Download your finished draft directly as an HTML document using the download button.</li>
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

        <RelatedTools currentSlug="online-text-editor" category="text" />
      </div>
    </ToolWrapper>
  );
}
