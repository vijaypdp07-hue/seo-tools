import React from "react";
import { SEO } from "@/components/SEO";

interface ToolWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolWrapper({ title, description, children }: ToolWrapperProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300 p-8">
      <SEO title={`${title} - Web Tools`} description={description} />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-text-muted">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
