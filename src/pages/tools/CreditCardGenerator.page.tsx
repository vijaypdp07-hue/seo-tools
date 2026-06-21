import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { CreditCard, RefreshCcw, AlertOctagon } from "lucide-react";

export function CreditCardGeneratorPage() {
  const [network, setNetwork] = useState<"visa"|"mastercard"|"amex"| "discover">("visa");
  const [quantity, setQuantity] = useState(5);
  const [cards, setCards] = useState<string[]>([]);

  // Luhn algorithm logic
  const generateCard = (prefix: string, length: number) => {
    let num = prefix;
    while (num.length < length - 1) {
        num += Math.floor(Math.random() * 10).toString();
    }
    
    // Calculate Luhn checksum digit
    let sum = 0;
    let isSecond = false;
    for (let i = num.length - 1; i >= 0; i--) {
        let d = parseInt(num[i]);
        if (isSecond) {
            d = d * 2;
            if (d > 9) d -= 9;
        }
        sum += d;
        isSecond = !isSecond;
    }
    const checksum = (sum * 9) % 10;
    return num + checksum.toString();
  };

  const handleGenerate = () => {
      let length = 16;
      let prefixes: string[] = [];
      
      if (network === "visa") { prefixes = ["4"]; }
      else if (network === "mastercard") { prefixes = ["51", "52", "53", "54", "55"]; }
      else if (network === "amex") { prefixes = ["34", "37"]; length = 15; }
      else if (network === "discover") { prefixes = ["6011", "65"]; }

      const newCards = [];
      for (let i=0; i<quantity; i++) {
          const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
          newCards.push(generateCard(prefix, length));
      }
      setCards(newCards);
  };

  const formatCard = (num: string) => {
      if (num.length === 15) { // AMEX
          return num.substring(0, 4) + " " + num.substring(4, 10) + " " + num.substring(10, 15);
      }
      // Standard 16 digit
      return num.match(/.{1,4}/g)?.join(' ') || num;
  };

  return (
    <ToolWrapper
      title="Credit Card Generator"
      description="Generate valid dummy credit card numbers for testing e-commerce checkouts and payment gateways."
      categoryName="Other Tools"
      categoryPath="/tools/other"
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Compliance Warning */}
        <div className="bg-error-light border border-error/20 p-4 rounded-lg flex gap-3 text-error">
            <AlertOctagon className="shrink-0 size-5" />
            <div className="text-sm space-y-1">
                <p className="font-bold">Disclaimer for Testing Only</p>
                <p>These card numbers are randomly generated using the Luhn Algorithm. They do not contain valid CVV codes or expiry dates and <strong>cannot be used for real financial transactions.</strong> They are solely for software development and testing purposes.</p>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4 bg-bg-base border border-border-base rounded-xl p-6 shadow-sm h-fit">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Card Network</label>
                    <select
                        value={network}
                        onChange={(e) => setNetwork(e.target.value as any)}
                        className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                    >
                        <option value="visa">Visa</option>
                        <option value="mastercard">Mastercard</option>
                        <option value="amex">American Express</option>
                        <option value="discover">Discover</option>
                    </select>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors flex justify-center items-center gap-2 mt-4"
                >
                    <RefreshCcw className="size-4" /> Generate
                </button>
            </div>

            <div className="md:col-span-2">
                {cards.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                        {cards.map((card, idx) => (
                            <div key={idx} className="bg-[#1E1E1E] text-white p-5 rounded-xl border border-[#333] shadow-lg relative overflow-hidden group">
                                <CreditCard className="absolute -right-4 -bottom-4 size-24 text-white/5" />
                                <div className="relative z-10 space-y-4">
                                    <div className="flex justify-between items-center text-white/70 text-xs font-bold uppercase tracking-widest">
                                        <span>{network}</span>
                                        <span>Test Card</span>
                                    </div>
                                    <p className="font-mono text-xl tracking-wider select-all">{formatCard(card)}</p>
                                    <div className="flex gap-4 text-xs font-mono text-white/60">
                                        <div>
                                            <p className="text-[10px] uppercase">EXP</p>
                                            <p>12/28</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase">CVV</p>
                                            <p>{network === "amex" ? "1234" : "123"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-text-muted border-2 border-dashed border-border-base rounded-xl">
                        <CreditCard className="size-12 opacity-20 mb-4" />
                        <p>Click generate to create testing cards</p>
                    </div>
                )}
            </div>
        </div>

      </div>
    </ToolWrapper>
  );
}
