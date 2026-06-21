import React, { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Clock, Plus, Trash2, Calculator } from "lucide-react";

export function HoursCalculatorPage() {
  const [timeBoxes, setTimeBoxes] = useState([{ id: 1, hours: "", minutes: "" }, { id: 2, hours: "", minutes: "" }]);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState<{ hours: number; minutes: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddBox = () => {
    setTimeBoxes([...timeBoxes, { id: Date.now(), hours: "", minutes: "" }]);
  };

  const handleRemoveBox = (id: number) => {
    if (timeBoxes.length <= 2) return;
    setTimeBoxes(timeBoxes.filter(box => box.id !== id));
  };

  const handleChange = (id: number, field: "hours" | "minutes", value: string) => {
    setTimeBoxes(timeBoxes.map(box => box.id === id ? { ...box, [field]: value } : box));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    let totalMinutes = 0;

    for (let i = 0; i < timeBoxes.length; i++) {
      const box = timeBoxes[i];
      const h = parseInt(box.hours) || 0;
      const m = parseInt(box.minutes) || 0;

      if (h < 0 || m < 0) {
          setError("Time values cannot be negative.");
          return;
      }
      
      const boxMinutes = (h * 60) + m;

      if (i === 0) {
        totalMinutes = boxMinutes;
      } else {
        if (operation === "add") {
          totalMinutes += boxMinutes;
        } else {
          totalMinutes -= boxMinutes;
        }
      }
    }

    const isNegative = totalMinutes < 0;
    const absMinutes = Math.abs(totalMinutes);
    const finalHours = Math.floor(absMinutes / 60) * (isNegative ? -1 : 1);
    const finalMins = absMinutes % 60;

    setResult({ hours: finalHours, minutes: finalMins });
  };

  return (
    <ToolWrapper
      title="Hours Calculator"
      description="Add or subtract times effortlessly. Calculate total payroll hours or project durations."
      categoryName="Calculators"
      categoryPath="/tools/calculators"
    >
      <div className="flex flex-col gap-8 max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleCalculate} className="space-y-6 bg-bg-base border border-border-base rounded-xl p-6 shadow-sm">
          
          <div className="flex items-center gap-4 mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-text-primary cursor-pointer">
                  <input 
                      type="radio" 
                      name="operation" 
                      value="add" 
                      checked={operation === "add"} 
                      onChange={() => setOperation("add")}
                      className="text-primary focus:ring-primary"
                  />
                  Add Times
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-text-primary cursor-pointer">
                  <input 
                      type="radio" 
                      name="operation" 
                      value="subtract" 
                      checked={operation === "subtract"} 
                      onChange={() => setOperation("subtract")}
                      className="text-primary focus:ring-primary"
                  />
                  Subtract Times
              </label>
          </div>

          <div className="space-y-4">
            {timeBoxes.map((box, index) => (
              <div key={box.id} className="flex items-center gap-3">
                 <div className="flex-grow grid grid-cols-2 gap-3">
                    <div>
                       <label className="block text-xs font-medium text-text-muted mb-1">{index === 0 ? "Start Time" : `Time ${index + 1}`} (Hours)</label>
                       <input
                          type="number"
                          min="0"
                          placeholder="hh"
                          value={box.hours}
                          onChange={(e) => handleChange(box.id, "hours", e.target.value)}
                          className="w-full px-3 py-2 bg-bg-base border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-medium text-text-muted mb-1">Minutes</label>
                       <input
                          type="number"
                          min="0"
                          max="59"
                          placeholder="mm"
                          value={box.minutes}
                          onChange={(e) => handleChange(box.id, "minutes", e.target.value)}
                          className="w-full px-3 py-2 bg-bg-base border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
                       />
                    </div>
                 </div>
                 {timeBoxes.length > 2 && index > 0 && (
                     <button
                         type="button"
                         onClick={() => handleRemoveBox(box.id)}
                         className="mt-5 p-2 text-text-muted hover:text-error transition-colors"
                         aria-label="Remove time box"
                     >
                         <Trash2 className="size-5" />
                     </button>
                 )}
              </div>
            ))}
          </div>

          {operation === "add" && (
             <button
                 type="button"
                 onClick={handleAddBox}
                 className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
             >
                 <Plus className="size-4" /> Add another time
             </button>
          )}

          {error && <div className="text-sm text-error">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex justify-center items-center gap-2 mt-4"
          >
            <Calculator className="size-5" />
            Calculate
          </button>
        </form>

        {result && (
          <div className="bg-bg-secondary border border-border-base rounded-xl p-8 text-center animate-in zoom-in-95 duration-300">
             <h3 className="text-lg font-medium text-text-secondary mb-4">Total Time</h3>
             <div className="text-4xl font-bold tracking-tight text-primary p-4 bg-primary-light/10 rounded-lg inline-block border border-primary/20">
                 {result.hours} <span className="text-base font-normal text-text-secondary uppercase">h</span> {Math.abs(result.minutes)} <span className="text-base font-normal text-text-secondary uppercase">m</span>
             </div>
             
             {result.hours !== 0 && result.minutes !== 0 && (
                 <div className="mt-4 text-text-muted text-sm space-y-1">
                     <p>Decimal: {(result.hours + (result.minutes / 60)).toFixed(2)} hours</p>
                     <p>Total Minutes: {(result.hours * 60) + result.minutes} minutes</p>
                 </div>
             )}
          </div>
        )}
      </div>
    </ToolWrapper>
  );
}
