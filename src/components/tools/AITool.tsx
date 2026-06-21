import React, { useState } from 'react';
import { Sparkles, Copy, Download, RefreshCw, Share } from 'lucide-react';
import { useHistoryStore } from '@/lib/store/useHistoryStore';

interface AIToolProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  actionButtonText: string;
  promptTemplate: string;
  systemInstruction?: string;
  hideInput?: boolean; 
  maxLength?: number;
  slug?: string;
  category?: string;
  toolPath?: string;
}

export function AITool({ 
  inputLabel = "Input Text",
  inputPlaceholder = "Enter your text here...",
  actionButtonText,
  promptTemplate,
  systemInstruction,
  hideInput = false,
  maxLength = 10000,
  slug,
  category,
  toolPath
}: AIToolProps) {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleProcess = async () => {
    setErrorMsg("");
    if (!hideInput && !inputText.trim()) {
      setErrorMsg("Please enter some text to process.");
      return;
    }
    if (!hideInput && inputText.length > maxLength) {
        setErrorMsg(`Text must be less than ${maxLength} characters.`);
        return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/tools/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          promptTemplate,
          systemInstruction
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to process request");
      }

      setResult(data.result || "");
      
      // Save generating history
      if (slug && category) {
        useHistoryStore.getState().recordUsage(slug, category, toolPath, {
          inputText: hideInput ? null : inputText,
          result: data.result,
        });
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    alert("Copied to clipboard!");
  };

  const downloadResult = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareResult = async () => {
    if (!result) return;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tool Result",
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("URL copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {errorMsg && (
        <div className="bg-error-light text-error p-3 rounded-lg text-sm mb-4 border border-error/20">
          {errorMsg}
        </div>
      )}

      {!hideInput && (
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-text-primary">{inputLabel}</label>
          <div className="relative">
            <textarea
              className="w-full h-48 p-4 bg-bg border border-border rounded-xl focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus resize-none custom-scrollbar text-text-primary"
              placeholder={inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={maxLength}
            />
            <div className="absolute bottom-3 right-3 text-xs text-text-muted bg-bg/80 px-2 rounded-md">
              {inputText.length} / {maxLength}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleProcess}
        disabled={isLoading || (!hideInput && inputText.length === 0)}
        className="w-full md:w-auto py-3 px-6 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 max-w-sm mx-auto"
      >
        {isLoading ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            {actionButtonText}
          </>
        )}
      </button>

      {/* Output Panel */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="font-semibold text-text-primary">Result</label>
        <div className="relative border border-border rounded-xl bg-bg min-h-[12rem] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-text-muted p-8">
              <RefreshCw className="w-8 h-8 animate-spin text-primary opacity-50 mb-4" />
              <div className="w-1/2 h-4 bg-border/50 rounded animate-pulse mb-2"></div>
              <div className="w-2/3 h-4 bg-border/50 rounded animate-pulse mb-2"></div>
              <div className="w-1/3 h-4 bg-border/50 rounded animate-pulse"></div>
            </div>
          ) : result ? (
             <div className="p-4 flex-1">
                <textarea
                  readOnly
                  className="w-full h-full min-h-[12rem] bg-transparent border-none focus:outline-none focus:ring-0 custom-scrollbar text-text-primary resize-y"
                  value={result}
                />
             </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-text-muted text-sm p-8">
              <Sparkles className="w-12 h-12 mb-4 opacity-20" />
              {hideInput ? "Click the button to generate content" : "Enter text above and click process to see results"}
            </div>
          )}
          
          <div className="bg-bg-secondary p-2 flex gap-2 justify-end rounded-b-xl border-t border-border">
             <button
                onClick={shareResult}
                disabled={!result || isLoading}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary bg-bg border border-border rounded-md hover:bg-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Share className="w-4 h-4" /> Share
              </button>
             <button
                onClick={copyToClipboard}
                disabled={!result || isLoading}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary bg-bg border border-border rounded-md hover:bg-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
              <button
                onClick={downloadResult}
                disabled={!result || isLoading}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary bg-bg border border-border rounded-md hover:bg-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Download className="w-4 h-4" /> Download
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
