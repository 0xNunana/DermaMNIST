import React from "react";
import { ProbabilityItem } from "@/types/api";

export const ProbabilityBar: React.FC<{ items: ProbabilityItem[] }> = ({ items }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
        Probability Distribution
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => {
          const isHighRisk = item.class_id === 4 || item.class_id === 1 || item.class_id === 0;
          return (
            <div key={item.class_id} className="space-y-1.5" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span className={item.probability > 0.3 ? "text-slate-100" : ""}>{item.short_label}</span>
                <span className="font-mono tracking-wider opacity-80">{item.percentage}</span>
              </div>
              <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${
                    isHighRisk 
                      ? item.probability > 0.5 ? "from-orange-500 to-brand-rose shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "from-orange-500/50 to-brand-rose/50"
                      : item.probability > 0.5 ? "from-brand-cyan to-brand-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "from-brand-cyan/50 to-brand-blue/50"
                  }`}
                  style={{ width: `${Math.max(item.probability * 100, 2)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
