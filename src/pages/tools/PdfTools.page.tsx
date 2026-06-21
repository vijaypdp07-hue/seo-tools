import { Link } from "react-router-dom";
import { FileCode, FileImage, Unlock, FileDown, Layers, ChevronRight, SplitSquareHorizontal, RotateCw, FileArchive } from "lucide-react";

export function PdfToolsPage() {
  const tools = [
    { name: "Merge PDF", icon: Layers, path: "/tools/pdf/merge-pdf", desc: "Combine multiple PDFs into one unified document." },
    { name: "Split PDF", icon: SplitSquareHorizontal, path: "/tools/pdf/split-pdf", desc: "Separate a PDF into multiple files." },
    { name: "PDF to JPG", icon: FileImage, path: "/tools/pdf/pdf-to-jpg", desc: "Convert PDF pages to high-quality JPG images." },
    { name: "Compress PDF", icon: FileDown, path: "/tools/pdf/compress-pdf", desc: "Reduce the file size of your PDF documents." },
    { name: "Lock PDF", icon: Unlock, path: "/tools/pdf/lock-pdf", desc: "Remove or add passwords to your PDF files." },
    { name: "Rotate PDF", icon: RotateCw, path: "/tools/pdf/rotate-pdf", desc: "Rotate specific pages or all pages in a PDF." },
    { name: "PDF to ZIP", icon: FileArchive, path: "/tools/pdf/pdf-to-zip", desc: "Convert PDF files into a compressed ZIP file." },
    { name: "Word to PDF", icon: FileCode, path: "/tools/pdf/word-to-pdf", desc: "Convert Microsoft Word documents to PDF." },
    { name: "PDF to Word", icon: FileCode, path: "/tools/pdf/pdf-to-word", desc: "Extract text from PDF to Word docx format." },
    { name: "Unlock PDF", icon: Unlock, path: "/tools/pdf/unlock-pdf", desc: "Remove passwords from your PDF files." },
    { name: "PowerPoint to PDF", icon: FileCode, path: "/tools/pdf/powerpoint-to-pdf", desc: "Convert PowerPoint files to PDF." },
    { name: "Excel to PDF", icon: FileCode, path: "/tools/pdf/excel-to-pdf", desc: "Convert Excel spreadsheets to PDF." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <nav aria-label="breadcrumb" className="flex items-center text-sm text-text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="size-4 mx-1" />
        <span className="text-text-primary font-medium" aria-current="page">PDF Tools</span>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <FileCode className="size-8 text-primary" />
          PDF Tools
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          Everything you need to work with PDFs directly in your web browser. Merge, convert, compress, and more - completely securely.
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
