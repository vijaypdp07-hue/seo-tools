import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  accept?: string | Record<string, string[]>;
  maxSizeMB?: number;
  onFile: (file: File) => void;
  onError: (error: string) => void;
  title?: string;
  description?: string;
}

export function DropZone({
  accept = "image/*",
  maxSizeMB = 10,
  onFile,
  onError,
  title = "Click or drag file to this area to upload",
  description,
}: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getAcceptString = () => {
    if (typeof accept === 'string') return accept;
    if (typeof accept === 'object') {
       return Object.entries(accept).map(([mime, exts]) => {
           return [...exts, mime].join(',');
       }).join(',');
    }
    return undefined;
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      onError(`File exceeds the ${maxSizeMB}MB limit.`);
      return;
    }
    
    // Simplistic accept checking
    const acceptStr = getAcceptString() || "*";
    if (acceptStr !== "*") {
       const acceptArray = acceptStr.split(",").map(a => a.trim());
       const isAccepted = acceptArray.some(type => {
           if (type.endsWith("/*")) {
               const baseGroup = type.split("/")[0];
               return file.type.startsWith(`${baseGroup}/`);
           }
           return file.type === type || file.name.toLowerCase().endsWith(type);
       });
       if (!isAccepted) {
           onError(`Invalid file format. Accepted formats: ${acceptStr}`);
           return;
       }
    }

    onFile(file);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "relative flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-xl cursor-pointer hover:bg-bg-secondary transition-colors p-8 text-center",
        isDragActive ? "border-primary bg-primary-light/50" : "border-border-base bg-bg-base"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={getAcceptString()}
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-bg-secondary rounded-full">
            <UploadCloud className="size-8 text-primary" />
        </div>
        <div className="space-y-1">
            <p className="text-lg font-semibold text-text-primary">
                {title}
            </p>
            <p className="text-sm text-text-muted">
                {description || `Maximum file size: ${maxSizeMB}MB`}
            </p>
        </div>
      </div>
    </div>
  );
}
