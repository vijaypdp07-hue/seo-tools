import { useState } from "react";
import { Search, MapPin, Globe, Network, Shield } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function GeoIpLocatorPage() {
  const [ipAddress, setIpAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleLookup = async () => {
    setIsProcessing(true);
    setResult(null);

    try {
      const response = await fetch(`/api/tools/geo-ip${ipAddress ? `?ip=${encodeURIComponent(ipAddress)}` : ''}`);
      
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to locate IP");
      }

      const data = await response.json();
      setResult(data);
      toast.success("IP details retrieved!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to locate IP");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ToolWrapper
      title="GEO IP Locator"
      description="Find the geographical location of any IP address or domain name."
      categoryName="Website Tools"
      categoryPath="/tools/website"
    >
      <div className="flex flex-col bg-bg-base border-b border-border-base min-h-[500px]">
          <div className="p-6 md:p-12 space-y-8 max-w-4xl mx-auto w-full">
              
              <div className="bg-bg-secondary p-8 rounded-xl border border-border-base shadow-sm space-y-4">
                  <div className="space-y-1">
                      <h3 className="text-lg font-bold text-text-primary">IP Address or Domain</h3>
                      <p className="text-sm text-text-secondary">Enter an IP address (IPv4/IPv6) or domain. Leave blank to check your own IP.</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                          <Network className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                          <input
                              type="text"
                              value={ipAddress}
                              onChange={(e) => setIpAddress(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                              placeholder="e.g. 8.8.8.8 or google.com"
                              className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary h-full"
                          />
                      </div>
                      <button
                          onClick={handleLookup}
                          disabled={isProcessing}
                          className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap shadow-tool disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                          {isProcessing ? (
                             <>
                                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Locating...
                             </>
                          ) : (
                             <>
                                <Search className="size-4" />
                                Lookup IP
                             </>
                          )}
                      </button>
                  </div>
              </div>

              {result && (
                  <div className="bg-bg-secondary border border-border-base rounded-xl p-6 md:p-8 space-y-6">
                      <div className="flex items-center gap-3 border-b border-border-base pb-4">
                          <MapPin className="size-6 text-primary" />
                          <h4 className="text-lg font-bold text-text-primary">IP Location Details</h4>
                      </div>

                      {result.status === "fail" ? (
                          <div className="bg-error-light text-error border border-error/20 p-4 rounded-lg">
                              <p>Failed to look up IP: {result.message}</p>
                          </div>
                      ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                                  <p className="text-sm text-text-muted font-medium mb-1 flex items-center gap-2"><Network className="size-4" /> IP Address</p>
                                  <p className="text-text-primary font-mono text-lg">{result.query}</p>
                              </div>
                              <div className="bg-bg-base p-4 rounded-lg border border-border-base">
                                  <p className="text-sm text-text-muted font-medium mb-1 flex items-center gap-2"><Globe className="size-4" /> Country</p>
                                  <p className="text-text-primary font-medium text-lg">{result.country} ({result.countryCode})</p>
                              </div>
                              <div className="bg-bg-base p-4 rounded-lg border border-border-base md:col-span-2">
                                  <p className="text-sm text-text-muted font-medium mb-1 flex items-center gap-2"><MapPin className="size-4" /> Location Information</p>
                                  <div className="grid grid-cols-2 gap-4 mt-2">
                                      <div>
                                          <p className="text-xs text-text-muted">Region/State</p>
                                          <p className="text-sm text-text-primary">{result.regionName}</p>
                                      </div>
                                      <div>
                                          <p className="text-xs text-text-muted">City</p>
                                          <p className="text-sm text-text-primary">{result.city}</p>
                                      </div>
                                      <div>
                                          <p className="text-xs text-text-muted">ZIP/Postal Code</p>
                                          <p className="text-sm text-text-primary">{result.zip || "N/A"}</p>
                                      </div>
                                      <div>
                                          <p className="text-xs text-text-muted">Timezone</p>
                                          <p className="text-sm text-text-primary">{result.timezone}</p>
                                      </div>
                                  </div>
                              </div>
                              <div className="bg-bg-base p-4 rounded-lg border border-border-base md:col-span-2">
                                  <p className="text-sm text-text-muted font-medium mb-1 flex items-center gap-2"><Shield className="size-4" /> Network Information</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                      <div>
                                          <p className="text-xs text-text-muted">ISP</p>
                                          <p className="text-sm text-text-primary">{result.isp}</p>
                                      </div>
                                      <div>
                                          <p className="text-xs text-text-muted">Organization</p>
                                          <p className="text-sm text-text-primary">{result.org}</p>
                                      </div>
                                      <div>
                                          <p className="text-xs text-text-muted">Latitude</p>
                                          <p className="text-sm text-text-primary">{result.lat}</p>
                                      </div>
                                      <div>
                                          <p className="text-xs text-text-muted">Longitude</p>
                                          <p className="text-sm text-text-primary">{result.lon}</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              )}
          </div>
      </div>
    </ToolWrapper>
  );
}
