import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import * as Sentry from "@sentry/react";
import React from "react";

export function ToolErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-6 border border-error-light bg-error-light/10 rounded-xl text-center my-8 max-w-2xl mx-auto">
      <h3 className="text-error font-medium text-lg mb-2">Something went wrong</h3>
      <p className="text-text-secondary text-sm mb-4">{(error as Error)?.message || "An unexpected error occurred"}</p>
      <button 
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-text-primary text-bg rounded-lg text-sm hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  );
}

export function ToolErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary 
      FallbackComponent={ToolErrorFallback}
      onError={(error, info) => Sentry.captureException(error, { extra: info })}
    >
      {children}
    </ErrorBoundary>
  );
}
