import { Link } from "react-router-dom";
import { Code, Binary, FileJson, ChevronRight } from "lucide-react";

export function DevToolsPage() {
  const tools = [
    { name: "JSON Viewer", icon: FileJson, path: "/tools/dev/json-viewer", desc: "Format, validate, and view JSON data instantly." },
    { name: "Binary to Text", icon: Binary, path: "/tools/dev/binary-to-text", desc: "Convert binary code into readable text." },
    { name: "Text to Binary", icon: Code, path: "/tools/dev/text-to-binary", desc: "Convert readable text into binary code." },
    { name: "PHP Formatter", icon: Code, path: "/tools/dev/php-formatter", desc: "Format and beautify your PHP code instantly." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <nav aria-label="breadcrumb" className="flex items-center text-sm text-text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="size-4 mx-1" />
        <span className="text-text-primary font-medium" aria-current="page">Dev Tools</span>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <Code className="size-8 text-primary" />
          Dev Tools
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          Fast and purely client-side tools for software developers. Format JSON, decode binary, and perform conversions without sending sensitive payload data to a server.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.name}
              to={tool.path}
              className="group flex flex-col p-6 rounded-xl border border-border-base bg-bg-base hover:shadow-tool hover:border-border-focus transition-all duration-200"
            >
              <div className="size-12 rounded-lg bg-primary-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <Icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-text-secondary flex-1">
                {tool.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
