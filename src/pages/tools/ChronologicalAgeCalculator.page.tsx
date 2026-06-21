import React, { useState } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Hourglass, Calendar, RefreshCcw } from "lucide-react";
import { differenceInYears, differenceInMonths, differenceInDays } from "date-fns";

export function ChronologicalAgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [testDate, setTestDate] = useState("");
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;
    
    let target = new Date();
    if (testDate) {
        target = new Date(testDate);
    }
    const birthDate = new Date(dob);

    if (target < birthDate) {
      setResult(null);
      return; // Invalid dates
    }

    const years = differenceInYears(target, birthDate);
    
    // Add years to birthdate to calculate remaining months
    const dateAfterYears = new Date(birthDate);
    dateAfterYears.setFullYear(birthDate.getFullYear() + years);
    
    const months = differenceInMonths(target, dateAfterYears);
    
    // Add months to calculate remaining days
    const dateAfterMonths = new Date(dateAfterYears);
    dateAfterMonths.setMonth(dateAfterYears.getMonth() + months);
    
    const days = differenceInDays(target, dateAfterMonths);

    setResult({ years, months, days });
  };

  return (
    <ToolWrapper
      title="Chronological Age Calculator"
      description="Calculate exact chronological age for testing, school, or medical purposes."
      categoryName="Calculators"
      categoryPath="/tools/calculators"
    >
      <div className="flex flex-col gap-8 max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleCalculate} className="space-y-6 bg-bg-base border border-border-base rounded-xl p-6 shadow-sm">
          
          <div className="space-y-2">
            <label htmlFor="dob" className="block text-sm font-medium text-text-primary">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="testDate" className="block text-sm font-medium text-text-primary">
              Date of Testing (Optional)
            </label>
            <input
              type="date"
              id="testDate"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full px-4 py-2 bg-bg-base border border-border-base rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary"
            />
            <p className="text-xs text-text-muted">Leave blank to use today's date</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex justify-center items-center gap-2"
          >
            <Hourglass className="size-5" />
            Calculate Chronological Age
          </button>
        </form>

        {result && (
          <div className="bg-bg-secondary border border-border-base rounded-xl p-8 text-center animate-in zoom-in-95 duration-300">
             <h3 className="text-lg font-medium text-text-secondary mb-4">Chronological Age</h3>
             <div className="text-4xl font-bold tracking-tight text-primary p-4 bg-primary-light/10 rounded-lg inline-block border border-primary/20">
               {result.years} <span className="text-base font-normal text-text-secondary uppercase">Years</span>, {result.months} <span className="text-base font-normal text-text-secondary uppercase">Months</span>, {result.days} <span className="text-base font-normal text-text-secondary uppercase">Days</span>
             </div>
          </div>
        )}
      </div>
    </ToolWrapper>
  );
}
