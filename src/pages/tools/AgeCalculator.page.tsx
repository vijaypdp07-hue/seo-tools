import { useState, useMemo } from "react";
import { ToolWrapper } from "@/components/shared/ToolWrapper";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

export function AgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0]);

  const result = useMemo(() => {
    if (!dob || !targetDate) return null;
    
    const d1 = new Date(dob);
    const d2 = new Date(targetDate);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    if (d1 > d2) return { error: "Date of birth cannot be after the target date." };

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months--;
      // get days in previous month
      const prevDate = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prevDate.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;
    
    return { years, months, days, totalMonths, totalWeeks, totalDays };

  }, [dob, targetDate]);

  return (
    <ToolWrapper
      title="Age Calculator"
      description="Calculate exact age in years, months, and days."
      categoryName="Calculators"
      categoryPath="/tools/calculators"
      seoContent={
        <div>
            <h2>How to use the Age Calculator</h2>
            <ol>
                <li>Enter your date of birth in the first field.</li>
                <li>The target date defaults to today, but you can change it to calculate age at a specific point in time.</li>
                <li>View your exact age down to the days, as well as total months, weeks, and days.</li>
            </ol>
            <p>Calculations are extremely fast and performed entirely within your web browser ensuring complete privacy.</p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border-base border-b border-border-base">
         <div className="p-6 bg-bg-base space-y-6">
             <div className="space-y-4">
                 <div className="space-y-2">
                     <label className="text-sm font-medium text-text-primary font-bold">Date of Birth</label>
                     <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full p-3 bg-bg-secondary text-text-primary border border-border-base rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                     />
                 </div>
                 <div className="space-y-2">
                     <label className="text-sm font-medium text-text-primary font-bold">Calculate Age At (Target Date)</label>
                     <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full p-3 bg-bg-secondary text-text-primary border border-border-base rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                     />
                 </div>
             </div>
         </div>
         
         <div className="p-6 bg-bg-secondary flex flex-col justify-center min-h-[300px]">
             {result ? (
                 result.error ? (
                     <div className="text-center p-6 text-error font-medium bg-error-light/50 rounded-xl border border-error/20 inline-block self-center">
                         {result.error}
                     </div>
                 ) : (
                     <div className="space-y-6 animate-in fade-in duration-300">
                         <div className="text-center bg-bg-base border border-primary/20 shadow-tool p-6 rounded-2xl border-t-4 border-t-primary">
                             <p className="text-sm text-text-secondary uppercase tracking-wider font-semibold mb-2">Age</p>
                             <div className="text-3xl md:text-4xl font-bold text-text-primary">
                                 {result.years} <span className="text-lg font-normal text-text-secondary">Years</span> {result.months} <span className="text-lg font-normal text-text-secondary">Months</span> {result.days} <span className="text-lg font-normal text-text-secondary">Days</span>
                             </div>
                         </div>

                         <div className="grid grid-cols-3 gap-4">
                             <div className="p-4 bg-bg-base rounded-xl border border-border-base text-center">
                                 <span className="block text-xl font-bold text-text-primary">{result.totalMonths.toLocaleString()}</span>
                                 <span className="text-xs text-text-secondary font-medium">Total Months</span>
                             </div>
                             <div className="p-4 bg-bg-base rounded-xl border border-border-base text-center">
                                 <span className="block text-xl font-bold text-text-primary">{result.totalWeeks.toLocaleString()}</span>
                                 <span className="text-xs text-text-secondary font-medium">Total Weeks</span>
                             </div>
                             <div className="p-4 bg-bg-base rounded-xl border border-border-base text-center">
                                 <span className="block text-xl font-bold text-text-primary">{result.totalDays.toLocaleString()}</span>
                                 <span className="text-xs text-text-secondary font-medium">Total Days</span>
                             </div>
                         </div>
                     </div>
                 )
             ) : (
                 <div className="text-center text-text-muted flex flex-col items-center justify-center p-8">
                     <CalendarIcon className="size-12 mb-4 opacity-30" />
                     <p>Select both dates to calculate age.</p>
                 </div>
             )}
         </div>
      </div>
    </ToolWrapper>
  );
}
