import { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { User, Copy, RefreshCcw, MapPin, Phone, Mail } from "lucide-react";
import { CopyButton } from "@/components/shared/CopyButton";

// Fake data registries
const firstNamesM = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"];
const firstNamesF = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];
const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA"];
const streets = ["Main St", "Oak St", "Pine St", "Maple Ave", "Cedar Ln", "Elm St", "Washington St", "Lake Dr"];

export function FakeNameGeneratorPage() {
  const [gender, setGender] = useState<"random" | "male" | "female">("random");
  const [profile, setProfile] = useState(generateProfile("random"));

  function generateProfile(gen: string) {
      const g = gen === "random" ? (Math.random() > 0.5 ? "male" : "female") : gen;
      const firstName = g === "male" 
          ? firstNamesM[Math.floor(Math.random() * firstNamesM.length)]
          : firstNamesF[Math.floor(Math.random() * firstNamesF.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      const cityIdx = Math.floor(Math.random() * cities.length);
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}@${domains[Math.floor(Math.random() * domains.length)]}`;
      const phone = `(${Math.floor(Math.random()*800)+200}) ${Math.floor(Math.random()*800)+200}-${Math.floor(Math.random()*9000)+1000}`;
      const address = `${Math.floor(Math.random()*9999)+1} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[cityIdx]}, ${states[cityIdx]} ${Math.floor(Math.random()*90000)+10000}`;
      
      const dob = new Date(1960 + Math.random() * 40, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

      return {
          name: `${firstName} ${lastName}`,
          gender: g === "male" ? "Male" : "Female",
          email,
          phone,
          address,
          dob: dob.toLocaleDateString(),
          username: `${firstName.toLowerCase()}${Math.floor(Math.random()*9999)}`
      };
  }

  const handleGenerate = () => {
      setProfile(generateProfile(gender));
  };

  const getProfileText = () => {
      return `Name: ${profile.name}\\nGender: ${profile.gender}\\nDate of Birth: ${profile.dob}\\nEmail: ${profile.email}\\nPhone: ${profile.phone}\\nAddress: ${profile.address}\\nUsername: ${profile.username}`;
  };

  return (
    <ToolWrapper
      title="Fake Identity Generator"
      description="Generate complete random user profiles for software testing, mockups, or privacy."
      categoryName="Other Tools"
      categoryPath="/tools/other"
    >
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        <div className="bg-bg-base border border-border-base rounded-xl p-6 shadow-sm flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-text-secondary">Gender:</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="px-3 py-2 bg-bg-secondary border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary text-sm"
                >
                   <option value="random">Random</option>
                   <option value="male">Male</option>
                   <option value="female">Female</option>
                </select>
            </div>
            
            <button
                onClick={handleGenerate}
                className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
            >
                <RefreshCcw className="size-4" /> Generate New Identity
            </button>
        </div>

        <div className="bg-bg-secondary border border-border-base rounded-xl overflow-hidden shadow-sm">
           <div className="bg-bg-base p-6 border-b border-border-base flex items-start justify-between">
              <div className="flex items-center gap-4">
                  <div className="size-16 bg-primary-light text-primary rounded-full flex items-center justify-center shrink-0">
                      <User className="size-8" />
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold text-text-primary">{profile.name}</h2>
                      <p className="text-text-muted">{profile.gender} • Born {profile.dob}</p>
                  </div>
              </div>
              <CopyButton text={getProfileText()} />
           </div>

           <div className="p-6 grid sm:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1"><Mail className="size-3"/> Email Address</p>
                      <p className="text-text-primary copyable font-mono text-sm">{profile.email}</p>
                  </div>
                  <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1"><Phone className="size-3"/> Phone Number</p>
                      <p className="text-text-primary copyable font-mono text-sm">{profile.phone}</p>
                  </div>
                  <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1"><User className="size-3"/> Username</p>
                      <p className="text-text-primary copyable font-mono text-sm">{profile.username}</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1"><MapPin className="size-3"/> Physical Address</p>
                      <p className="text-text-primary copyable text-sm leading-relaxed max-w-[200px]">{profile.address}</p>
                  </div>
               </div>
           </div>
        </div>

      </div>
    </ToolWrapper>
  );
}
