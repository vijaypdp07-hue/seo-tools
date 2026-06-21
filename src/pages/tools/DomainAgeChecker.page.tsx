import { useState } from "react";
import { Search, Globe, Calendar, Clock, Activity, Code } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function DomainAgeCheckerPage() {
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
      const response = await fetch(`/api/tools/domain-age?domain=${encodeURIComponent(domain)}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch domain age");
      }

      const data = await response.json();
      setResult(data);
      toast.success("Domain information retrieved!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to fetch domain details");
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateAge = (registrationDate: string) => {
      if (!registrationDate) return null;
      const start = new Date(registrationDate);
      const now = new Date();
      
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();

      if (days < 0) {
          months--;
          days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      }
      if (months < 0) {
          years--;
          months += 12;
      }
      return { years, months, days };
  };

  return (
    <ToolWrapper
      title="Domain Age Checker"
      description="Find out the exact age of any domain name, from its registration to its expiration date."
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
                                Find Age
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="space-y-6">
                      <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8">
                          <div className="flex items-center justify-between border-b border-border-base pb-4 mb-6">
                              <div className="flex items-center gap-3">
                                  <Clock className="size-6 text-primary" />
                                  <h4 className="text-lg font-bold text-text-primary">Domain Age Result</h4>
                              </div>
                              <span className="bg-primary/10 text-primary py-1 px-3 rounded-full text-xs font-bold font-mono tracking-wider">
                                  {result.domain}
                              </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-bg-base border border-border-base rounded-xl p-6 flex flex-col items-center justify-center text-center">
                                  <p className="text-sm font-bold text-text-muted uppercase mb-2">Age</p>
                                  {result.registrationDate ? (() => {
                                      const age = calculateAge(result.registrationDate);
                                      if (!age) return <p className="text-xl font-bold text-text-primary">Unknown</p>;
                                      return (
                                          <p className="text-3xl font-bold text-primary">
                                              {age.years} <span className="text-lg font-normal text-text-secondary">yrs</span> {" "}
                                              {age.months} <span className="text-lg font-normal text-text-secondary">mos</span>
                                          </p>
                                      );
                                  })() : (
                                      <p className="text-xl font-bold text-text-primary">Unknown</p>
                                  )}
                              </div>
                              <div className="flex flex-col gap-4">
                                  <div className="bg-bg-base border border-border-base rounded-xl p-4 flex items-center gap-4">
                                      <div className="bg-primary-light p-3 rounded-lg text-primary"><Calendar className="size-5" /></div>
                                      <div>
                                          <p className="text-xs font-bold text-text-muted uppercase mb-1">Creation Date</p>
                                          <p className="text-text-primary font-medium">{result.registrationDate ? new Date(result.registrationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}</p>
                                      </div>
                                  </div>
                                  <div className="bg-bg-base border border-border-base rounded-xl p-4 flex items-center gap-4">
                                      <div className="bg-primary-light p-3 rounded-lg text-primary"><Activity className="size-5" /></div>
                                      <div>
                                          <p className="text-xs font-bold text-text-muted uppercase mb-1">Expiration Date</p>
                                          <p className="text-text-primary font-medium">{result.expirationDate ? new Date(result.expirationDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="bg-bg-secondary border border-border-base rounded-xl p-6">
                            <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2 border-b border-border-base pb-3">
                                <Code className="size-5 text-primary" />
                                Raw WHOIS/RDAP Data
                            </h4>
                            <div className="bg-bg-base border border-border-base rounded-lg p-4 overflow-x-auto max-h-[300px] overflow-y-auto">
                                <pre className="text-xs text-text-secondary font-mono">
                                    {JSON.stringify(result.raw, null, 2)}
                                </pre>
                            </div>
                      </div>
                  </div>
              )}

          </div>
      </div>
    </ToolWrapper>
  );
}
