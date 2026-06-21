import { Link } from "react-router-dom";
import { Calculator, Hourglass, Calendar, ChevronRight } from "lucide-react";

export function CalculatorsPage() {
  const tools = [
    { name: "Age Calculator", icon: Calendar, path: "/tools/calculators/age", desc: "Calculate your exact age in years, months, and days." },
    { name: "Chronological Age", icon: Hourglass, path: "/tools/calculators/chronological", desc: "Specialized chronological age calculator." },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <nav aria-label="breadcrumb" className="flex items-center text-sm text-text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="size-4 mx-1" />
        <span className="text-text-primary font-medium" aria-current="page">Calculators</span>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
          <Calculator className="size-8 text-primary" />
          Calculators
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          Free online calculators for age computation and precise chronological calculations. Fast, local, and accurate.
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
