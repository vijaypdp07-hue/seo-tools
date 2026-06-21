import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Calculator, DollarSign, TrendingUp } from "lucide-react";

export function AdsenseCalculatorPage() {
  const [pageViews, setPageViews] = useState<number>(10000);
  const [ctr, setCtr] = useState<number>(1.5);
  const [cpc, setCpc] = useState<number>(0.25);

  const totalClicks = Math.round((pageViews * ctr) / 100);
  const dailyEarnings = totalClicks * cpc;
  const monthlyEarnings = dailyEarnings * 30;
  const yearlyEarnings = dailyEarnings * 365;

  return (
    <ToolWrapper
      title="AdSense Calculator"
      description="Estimate your website's Google AdSense earnings based on page views, click-through rate (CTR), and cost per click (CPC)."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 grid md:grid-cols-2 gap-8">
        
        <form className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm space-y-6" onSubmit={(e) => e.preventDefault()}>
           
           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-sm font-medium text-text-primary flex justify-between">
                     <span>Daily Page Views</span>
                 </label>
                 <input
                     type="number"
                     min="0"
                     value={pageViews}
                     onChange={(e) => setPageViews(Number(e.target.value))}
                     className="w-full px-4 py-3 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary font-mono text-lg"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium text-text-primary flex justify-between">
                     <span>Click Through Rate (CTR) %</span>
                 </label>
                 <div className="relative">
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={ctr}
                        onChange={(e) => setCtr(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary font-mono text-lg pr-10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">%</span>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-medium text-text-primary flex justify-between">
                     <span>Cost Per Click (CPC) $</span>
                 </label>
                 <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">$</span>
                     <input
                         type="number"
                         min="0"
                         step="0.01"
                         value={cpc}
                         onChange={(e) => setCpc(Number(e.target.value))}
                         className="w-full px-4 py-3 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary font-mono text-lg pl-8"
                     />
                 </div>
              </div>
           </div>
           
           <div className="p-4 bg-primary-light/5 border border-primary/10 rounded-lg">
               <p className="text-xs text-text-secondary leading-relaxed">
                   <strong>Formula:</strong> Earnings = (Page Views × CTR%) × CPC
               </p>
           </div>
        </form>

        <div className="flex flex-col gap-4">
             <div className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm flex items-center justify-between">
                 <div>
                     <p className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-1">Daily Earnings</p>
                     <p className="text-3xl font-bold text-success">${dailyEarnings.toFixed(2)}</p>
                 </div>
                 <div className="size-12 bg-success-light rounded-full flex items-center justify-center text-success">
                     <DollarSign className="size-6" />
                 </div>
             </div>

             <div className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm flex items-center justify-between">
                 <div>
                     <p className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-1">Monthly Earnings</p>
                     <p className="text-4xl font-bold text-success">${monthlyEarnings.toFixed(2)}</p>
                 </div>
                 <div className="size-12 bg-success-light rounded-full flex items-center justify-center text-success">
                     <TrendingUp className="size-6" />
                 </div>
             </div>

             <div className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm flex items-center justify-between">
                 <div>
                     <p className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-1">Yearly Earnings</p>
                     <p className="text-3xl font-bold text-primary">${yearlyEarnings.toFixed(2)}</p>
                 </div>
                 <div className="size-12 bg-primary-light rounded-full flex items-center justify-center text-primary">
                     <Calculator className="size-6" />
                 </div>
             </div>
             
             <div className="bg-bg-base border border-border-base rounded-xl p-4 shadow-sm flex items-center justify-between border-l-4 border-l-info">
                 <p className="text-sm font-medium text-text-secondary">Estimated Daily Clicks</p>
                 <p className="text-lg font-bold text-text-primary">{totalClicks}</p>
             </div>
        </div>

      </div>
    </ToolWrapper>
  );
}
