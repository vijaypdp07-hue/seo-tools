import { useState, useCallback, useEffect } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { toast } from "sonner";

export function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allowedChars = "";
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeLowercase) allowedChars += lowercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    if (allowedChars.length === 0) {
      setPassword("Please select at least one option.");
      return;
    }

    const randomArray = new Uint32Array(length);
    crypto.getRandomValues(randomArray);

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += allowedChars[randomArray[i] % allowedChars.length];
    }

    setPassword(generatedPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password || password.startsWith("Please")) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    if (!password || password.startsWith("Please")) return { label: "N/A", color: "bg-border-base" };
    let strength = 0;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    if (includeUppercase) strength += 1;
    if (includeLowercase) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSymbols) strength += 2;

    if (strength < 3) return { label: "Weak", color: "bg-error" };
    if (strength < 5) return { label: "Medium", color: "bg-warning" };
    return { label: "Strong", color: "bg-success" };
  };

  const strength = calculateStrength();

  return (
    <ToolWrapper
      title="Random Password Generator"
      description="Create secure, random passwords online using cryptographically secure algorithms."
      categoryName="Other Tools"
      categoryPath="/tools/other"
      seoContent={
        <div>
          <h2>How to use the Password Generator</h2>
          <ol>
            <li>Select the desired length for your password (up to 128 characters).</li>
            <li>Choose which character types to include (uppercase, lowercase, numbers, symbols).</li>
            <li>Click the "Generate" button or easily tweak options for an instant refresh.</li>
            <li>Copy your new secure password!</li>
          </ol>
          <p>This tool runs entirely in your browser using the <code>crypto.getRandomValues</code> API. Passwords are never sent to a server.</p>
        </div>
      }
    >
      <div className="p-6 md:p-8 flex flex-col gap-8 bg-bg-base border-b border-border-base">
        <div className="max-w-xl mx-auto w-full space-y-6">
          <div className="relative">
            <input
              type="text"
              readOnly
              value={password}
              className="w-full text-2xl font-mono p-4 pr-16 bg-bg-secondary border border-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-2 p-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
            </button>
          </div>

          <div className="space-y-2">
             <div className="flex justify-between items-center text-sm font-medium">
               <span>Password Strength</span>
               <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
             </div>
             <div className="h-2 w-full bg-bg-tertiary rounded-full overflow-hidden flex gap-1">
                <div className={`h-full ${strength.color} transition-all duration-300 w-full`} style={{ opacity: strength.label === "Weak" ? 0.33 : strength.label === "Medium" ? 0.66 : 1 }} />
             </div>
          </div>

          <div className="bg-bg-tertiary p-6 rounded-xl border border-border-base space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <label className="font-medium text-text-primary text-sm">Password Length</label>
                <span className="font-bold text-primary">{length}</span>
              </div>
              <input
                type="range"
                min="4"
                max="128"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-5 h-5 text-primary rounded border-border-base focus:ring-primary accent-primary"
                />
                <span className="text-sm font-medium">Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-5 h-5 text-primary rounded border-border-base focus:ring-primary accent-primary"
                />
                <span className="text-sm font-medium">Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-5 h-5 text-primary rounded border-border-base focus:ring-primary accent-primary"
                />
                <span className="text-sm font-medium">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-5 h-5 text-primary rounded border-border-base focus:ring-primary accent-primary"
                />
                <span className="text-sm font-medium">Symbols (!@#$)</span>
              </label>
            </div>
          </div>

          <button
            onClick={generatePassword}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-tool hover:shadow-lg"
          >
            <RefreshCw className="size-5" />
            Generate New Password
          </button>
        </div>
      </div>
    </ToolWrapper>
  );
}
