import { useState } from "react";
import { Search, Globe, Server, Activity } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function DomainHostingCheckerPage() {
  const [domain, setDomain] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!domain.trim()) {
      toast.error("Please enter a domain name.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch(`/api/tools/dns-lookup?domain=${encodeURIComponent(domain)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to lookup domain hosting");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Domain hosting details retrieved!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to fetch domain details");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="Domain Hosting Checker"
      description="Find out who is hosting any website and view its DNS records."
      categoryName="Domain Tools"
      categoryPath="/tools/domain"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">Domain Name</h3>
                      <p className="text-sm text-text-secondary">Enter the domain you want to check (e.g., netflix.com).</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={domain}
                              onChange={(e) => setDomain(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                              placeholder="e.g. google.com"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary h-full"
                          />
                      </div>
                      <button
                          onClick={handleCheck}
                          disabled={isProcessing}
                          className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap shadow-tool disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                          {isProcessing ? (
                             <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Checking...
                             </>
                          ) : (
                             <>
                                <Search className="size-4" />
                                Find Host
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-border-base pb-4">
                          <Server className="size-6 text-primary" />
                          <h4 className="text-lg font-bold text-text-primary">Hosting & DNS Information</h4>
                      </div>
                      
                      <div className="space-y-6">
                         <div>
                             <h5 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2"><Activity className="size-4" /> IPv4 (A Records)</h5>
                             <div className="bg-bg-base border border-border-base rounded-md p-3">
                                 {result.records.A.length > 0 ? (
                                    <ul className="list-disc list-inside text-text-primary font-mono text-sm space-y-1">
                                        {result.records.A.map((ip: string, i: number) => <li key={i}>{ip}</li>)}
                                    </ul>
                                 ) : <p className="text-sm text-text-muted">No A records found.</p>}
                             </div>
                         </div>
                         
                         <div>
                             <h5 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2"><Activity className="size-4" /> IPv6 (AAAA Records)</h5>
                             <div className="bg-bg-base border border-border-base rounded-md p-3">
                                 {result.records.AAAA.length > 0 ? (
                                    <ul className="list-disc list-inside text-text-primary font-mono text-sm space-y-1">
                                        {result.records.AAAA.map((ip: string, i: number) => <li key={i}>{ip}</li>)}
                                    </ul>
                                 ) : <p className="text-sm text-text-muted">No AAAA records found.</p>}
                             </div>
                         </div>
                         
                         <div>
                             <h5 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2"><Activity className="size-4" /> Mail Servers (MX Records)</h5>
                             <div className="bg-bg-base border border-border-base rounded-md p-3">
                                 {result.records.MX.length > 0 ? (
                                    <ul className="list-disc list-inside text-text-primary font-mono text-sm space-y-1">
                                        {result.records.MX.map((mx: any, i: number) => <li key={i}>Priority {mx.priority}: {mx.exchange}</li>)}
                                    </ul>
                                 ) : <p className="text-sm text-text-muted">No MX records found.</p>}
                             </div>
                         </div>
                         
                         <div>
                             <h5 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2"><Activity className="size-4" /> TXT Records</h5>
                             <div className="bg-bg-base border border-border-base rounded-md p-3">
                                 {result.records.TXT.length > 0 ? (
                                    <ul className="list-disc list-inside text-text-primary font-mono text-xs space-y-1 break-all">
                                        {result.records.TXT.map((txt: string, i: number) => <li key={i}>{txt}</li>)}
                                    </ul>
                                 ) : <p className="text-sm text-text-muted">No TXT records found.</p>}
                             </div>
                         </div>
                      </div>

                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
