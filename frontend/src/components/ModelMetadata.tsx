import React from "react";

export const ModelMetadata: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 space-y-5 relative overflow-hidden group">
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-blue/20 blur-2xl rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-cyan">
          System Diagnostics
        </h3>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      </div>
      
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[11px] uppercase tracking-wider">
        <div className="space-y-1">
          <span className="text-slate-500 block">Dataset</span>
          <span className="font-mono text-slate-200">DermaMNIST v2</span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-500 block">Input Tensor</span>
          <span className="font-mono text-slate-200">3 × 28 × 28 RGB</span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-500 block">Base Accuracy</span>
          <span className="font-mono text-brand-cyan">69.99%</span>
        </div>
        <div className="space-y-1">
          <span className="text-slate-500 block">Macro AUC</span>
          <span className="font-mono text-brand-cyan">0.8803</span>
        </div>
        <div className="col-span-2 space-y-1">
          <span className="text-slate-500 block">Target Architecture</span>
          <span className="font-mono text-slate-200">7-Class Diagnostic Triage</span>
        </div>
      </div>
    </div>
  );
};
