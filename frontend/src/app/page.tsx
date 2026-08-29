"use client";

import React, { useState } from "react";
import { Dropzone } from "@/components/Dropzone";
import { ProbabilityBar } from "@/components/ProbabilityBar";
import { ModelMetadata } from "@/components/ModelMetadata";
import { PredictionResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Inference failed");
      }

      const data: PredictionResponse = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to connect to the model server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden py-12 px-6 md:px-12 selection:bg-brand-cyan/30">
      
      {/* Decorative ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-brand-cyan/30 text-brand-cyan text-[10px] font-bold tracking-widest uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              System Active
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              DermaMNIST AI
            </h1>
            <p className="text-sm text-slate-400 font-light tracking-wide max-w-lg">
              Advanced deep learning network for dermatoscopic lesion triage and diagnostic assistance.
            </p>
          </div>
        </header>

        {/* Disclaimer Banner */}
        <div className="glass-panel bg-orange-500/5 border-orange-500/20 p-4 rounded-xl flex items-start gap-4">
          <svg className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <p className="text-xs text-orange-200/80 leading-relaxed font-light">
            <strong className="font-semibold text-orange-300">Research Benchmark Only:</strong> Trained on MedMNIST v2. This system is for educational evaluation only and must <span className="underline decoration-orange-500/50 underline-offset-2">never</span> be used for actual clinical decision-making.
          </p>
        </div>

        {/* Dynamic Layout Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 transition-all duration-700 ease-in-out ${result ? "items-start" : "items-center max-w-4xl mx-auto"}`}>
          
          {/* Left Column: Upload */}
          <div className={`space-y-6 transition-all duration-700 ${result ? "md:col-span-5" : "md:col-span-12"}`}>
            <div className="glass-panel p-6 rounded-2xl space-y-6 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <h2 className="text-sm font-semibold tracking-wide text-slate-200 mb-4">Input Tensor</h2>
                <Dropzone onFileSelected={(file) => { setSelectedFile(file); setResult(null); }} isLoading={isLoading} />
              </div>
              
              <button
                onClick={handlePredict}
                disabled={!selectedFile || isLoading}
                className="w-full relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-sm text-white py-3.5 px-4 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-300 group-hover/btn:scale-105" />
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Processing Inference...
                    </>
                  ) : (
                    "Initialize Analysis"
                  )}
                </span>
              </button>

              {error && (
                <div className="p-3 glass-panel border-brand-rose/20 bg-brand-rose/5 rounded-lg text-xs text-rose-300 animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}
            </div>

            <div className={`transition-all duration-700 delay-100 ${result ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute"}`}>
               <ModelMetadata />
            </div>
          </div>

          {/* Right Column: Results */}
          {result && (
            <div className="md:col-span-7 animate-in fade-in slide-in-from-right-8 duration-700 ease-out fill-mode-both">
              <div className="glass-panel rounded-2xl p-8 shadow-2xl relative overflow-hidden space-y-8">
                {/* Accent line */}
                <div className={`absolute top-0 left-0 w-full h-1 ${result.is_malignant_risk ? 'bg-gradient-to-r from-orange-500 to-brand-rose' : 'bg-gradient-to-r from-brand-cyan to-brand-blue'}`} />
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/5 pb-6">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Primary Classification</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{result.prediction}</h3>
                  </div>
                  <div className="text-left md:text-right space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Confidence Score</span>
                    <div className="text-3xl font-mono font-light text-brand-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                      {result.confidence_percentage}
                    </div>
                  </div>
                </div>

                {result.is_malignant_risk && (
                  <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 flex items-start gap-3">
                    <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <div>
                      <span className="font-bold text-rose-300 text-sm block mb-1">High-Risk Lesion Detected</span>
                      <span className="text-rose-200/70 text-xs leading-relaxed">
                        The model identified patterns consistent with {result.prediction}. In a clinical setting, this would mandate immediate dermatological review.
                      </span>
                    </div>
                  </div>
                )}

                <ProbabilityBar items={result.probabilities} />

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                  <span className="flex items-center gap-2">
                    <svg className="w-3 h-3 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Latency: {result.inference_time_ms}ms
                  </span>
                  <span>{result.model_version}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
