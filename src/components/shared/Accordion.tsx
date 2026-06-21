import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              "border border-border-base rounded-md px-4 overflow-hidden bg-bg-base transition-colors",
              isOpen ? "border-primary/30 shadow-sm" : "hover:border-border-focus"
            )}
          >
            <button
              onClick={() => toggleOpen(index)}
              className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className={cn("font-medium", isOpen ? "text-primary" : "text-text-primary")}>
                {item.title}
              </span>
              <ChevronDown
                className={cn("size-4 shrink-0 text-text-muted transition-transform duration-200", isOpen && "rotate-180 text-primary")}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out text-sm text-text-secondary leading-relaxed",
                isOpen ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"
              )}
            >
              <div className="pt-1">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
