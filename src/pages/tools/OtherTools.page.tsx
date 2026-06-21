import { Link } from "react-router-dom";
import { Fingerprint, ShieldAlert, Smile, Key, QrCode, ChevronRight } from "lucide-react";

export function OtherToolsPage() {
  const tools = [
    { name: "Fake Name Generator", icon: Fingerprint, path: "/tools/other/fake-name-generator", desc: "Generate complete random user profiles for testing." },
    { name: "Credit Card Generator", icon: ShieldAlert, path: "/tools/other/credit-card-generator", desc: "Generate valid dummy credit card numbers for testing checkouts." },
    { name: "Emojis Search", icon: Smile, path: "/tools/other/emojis", desc: "Find, copy and paste emojis easily." },
    { name: "Password Generator", icon: Key, path: "/tools/other/password-generator", desc: "Create secure passwords instantly." },
    { name: "QR Code Generator", icon: QrCode, path: "/tools/other/qr-code-generator", desc: "Create random custom QR codes for URLs and text." },
    { name: "Find Facebook ID", icon: Fingerprint, path: "/tools/other/find-facebook-id", desc: "Find the numeric ID of any Facebook profile or page." },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Other Tools
        </h1>
        <p className="text-lg text-text-secondary">
          Miscellaneous utilities for random data generation and everyday tasks.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link 
              key={tool.name} 
              to={tool.path}
              className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex items-start gap-4"
            >
              <div className="p-3 bg-primary-light/10 text-primary rounded-lg shrink-0">
                  <Icon className="size-6" />
              </div>
              <div className="flex-1 space-y-1">
                 <h2 className="font-bold text-text-primary flex items-center gap-1 group-hover:text-primary transition-colors">
                     {tool.name} <ChevronRight className="size-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                 </h2>
                 <p className="text-sm text-text-secondary leading-relaxed">
                     {tool.desc}
                 </p>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
