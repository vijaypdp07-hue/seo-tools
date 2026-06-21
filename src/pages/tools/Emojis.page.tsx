import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Search, Copy } from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";

// Subset for demo, real implementation should probably load a full JSON or use a robust library
const emojidb = [
    { e: "😀", n: "grinning face", t: "smile happy" },
    { e: "😂", n: "face with tears of joy", t: "laugh cry" },
    { e: "🤣", n: "rolling on the floor laughing", t: "rofl" },
    { e: "❤️", n: "red heart", t: "love" },
    { e: "✨", n: "sparkles", t: "magic star shiny" },
    { e: "🔥", n: "fire", t: "hot lit" },
    { e: "💀", n: "skull", t: "dead death" },
    { e: "🥺", n: "pleading face", t: "beg shy" },
    { e: "✅", n: "check mark button", t: "done tick yes" },
    { e: "🚀", n: "rocket", t: "ship space launch fast" },
    { e: "👍", n: "thumbs up", t: "yes agree good" },
    { e: "🎉", n: "party popper", t: "celebration yay" },
    { e: "👀", n: "eyes", t: "look watch peep" },
    { e: "🤔", n: "thinking face", t: "hmm wonder" },
    { e: "😎", n: "smiling face with sunglasses", t: "cool smart" },
];

export function EmojisPage() {
  const [search, setSearch] = useState("");

  const filtered = emojidb.filter(item => 
       item.n.includes(search.toLowerCase()) || 
       item.t.includes(search.toLowerCase())
  );

  return (
    <ToolWrapper
      title="Emoji Search & Copy"
      description="Quickly find and copy emojis for your social media, code, or messages."
      categoryName="Other Tools"
      categoryPath="/tools/other"
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted size-5" />
            <input
               type="text"
               placeholder="Search emojis... (e.g. 'smile', 'fire', 'heart')"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full pl-12 pr-4 py-4 bg-bg-base border border-border-base rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm text-text-primary text-lg"
               autoFocus
            />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.length === 0 ? (
                <div className="col-span-full py-12 text-center text-text-muted">
                    No emojis found matching "{search}"
                </div>
            ) : (
                filtered.map((item, idx) => (
                    <div key={idx} className="bg-bg-base border border-border-base rounded-xl p-4 flex flex-col items-center gap-3 hover:border-primary/50 hover:shadow-md transition-all group">
                        <span className="text-5xl group-hover:scale-110 transition-transform">{item.e}</span>
                        <span className="text-xs text-text-muted text-center truncate w-full">{item.n}</span>
                        <CopyButton text={item.e} className="w-full bg-bg-secondary hover:bg-border-base text-text-primary" />
                    </div>
                ))
            )}
        </div>

      </div>
    </ToolWrapper>
  );
}
