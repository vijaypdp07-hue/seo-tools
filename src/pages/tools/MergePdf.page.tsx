import { useState } from "react";
import { Download, File as FileIcon, X, MoveUp, MoveDown } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { DropZone } from "@/components/shared/DropZone";

export function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMsg("Please upload at least two PDF files to merge.");
      return;
    }
    
    setIsProcessing(true);
    setErrorMsg("");
    setMergedPdfUrl(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setMergedPdfUrl(URL.createObjectURL(blob));

      // Record History
      const { useHistoryStore } = await import('@/lib/store/useHistoryStore');
      useHistoryStore.getState().recordUsage('merge-pdf', 'PDF Tools', '/tools/pdf/merge-pdf', {
        result: `${files.length} PDFs merged into one.`
      });
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to merge PDFs. One of the files might be corrupted or password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const moveFileUrl = (index: number, direction: 'up' | 'down') => {
      const newFiles = [...files];
      if (direction === 'up' && index > 0) {
          [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      } else if (direction === 'down' && index < newFiles.length - 1) {
          [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
      }
      setFiles(newFiles);
  };

  const removeFile = (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
      setMergedPdfUrl(null);
  };

  const addFile = (file: File) => {
      setFiles(prev => [...prev, file]);
      setMergedPdfUrl(null);
  };

  return (
    <ToolWrapper
      title="Merge PDF"
      description="Combine multiple PDFs into one unified document."
      categoryName="PDF Tools"
      categoryPath="/tools/pdf"
      seoContent={
          <div>
              <h2>How to Merge PDF files</h2>
              <ol>
                  <li>Upload two or more PDF files using the drop zone.</li>
                  <li>Reorder the files using the up and down arrows if necessary.</li>
                  <li>Click 'Merge PDFs'.</li>
                  <li>Download the final combined document instantly. Everything happens securely on your device.</li>
              </ol>
          </div>
      }
    >
      <div className="flex flex-col border-b border-border-base relative">
          <div className="p-6 bg-bg-base border-b border-border-base">
              {errorMsg && <p className="text-error mb-4 text-center text-sm font-medium">{errorMsg}</p>}
              
              <DropZone 
                  accept="application/pdf" 
                  maxSizeMB={50} 
                  onFile={addFile} 
                  onError={setErrorMsg} 
                  title="Drop a PDF file to add"
                  description="You can add multiple files after the first one."
              />
          </div>

          {files.length > 0 && (
              <div className="p-6 bg-bg-secondary flex flex-col items-center">
                  <div className="w-full max-w-2xl bg-bg-base border border-border-base rounded-xl overflow-hidden shadow-sm mb-6">
                      {files.map((file, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 border-b border-border-base last:border-b-0">
                               <FileIcon className="size-6 text-error shrink-0" />
                               <div className="flex-1 min-w-0">
                                   <p className="font-medium text-sm text-text-primary truncate">{file.name}</p>
                                   <p className="text-xs text-text-muted">{formatSize(file.size)}</p>
                               </div>
                               <div className="flex items-center gap-1">
                                   <button disabled={index === 0} onClick={() => moveFileUrl(index, 'up')} className="p-1.5 text-text-muted hover:text-primary disabled:opacity-30 rounded hover:bg-bg-secondary"><MoveUp className="size-4" /></button>
                                   <button disabled={index === files.length - 1} onClick={() => moveFileUrl(index, 'down')} className="p-1.5 text-text-muted hover:text-primary disabled:opacity-30 rounded hover:bg-bg-secondary"><MoveDown className="size-4" /></button>
                                   <button onClick={() => removeFile(index)} className="p-1.5 text-text-muted hover:text-error rounded hover:bg-error-light ml-2"><X className="size-4" /></button>
                               </div>
                          </div>
                      ))}
                  </div>

                  {isProcessing ? (
                     <div className="flex items-center text-text-primary text-sm gap-2 bg-bg-base px-6 py-3 border border-border-base rounded-full shadow-sm">
                         <div className="size-4 border-2 border-text-muted border-t-primary rounded-full animate-spin" />
                         Merging PDFs...
                     </div>
                  ) : !mergedPdfUrl ? (
                      <button 
                          onClick={handleMerge}
                          disabled={files.length < 2}
                          className="px-8 py-3 bg-primary text-white font-medium text-lg rounded-xl hover:bg-primary-dark transition-colors shadow-tool disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                          Merge PDFs
                      </button>
                  ) : (
                      <div className="flex flex-col items-center gap-4">
                          <div className="bg-success-light text-success font-medium px-4 py-2 rounded-full inline-flex items-center gap-2">
                              ✓ PDFs Merged Successfully
                          </div>
                          <a 
                              href={mergedPdfUrl}
                              download="merged-document.pdf"
                              className="px-8 py-3 bg-primary text-white font-medium text-lg rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-tool"
                          >
                              <Download className="size-5" /> Download Merged PDF
                          </a>
                      </div>
                  )}
              </div>
          )}
      </div>
    </ToolWrapper>
  );
}
