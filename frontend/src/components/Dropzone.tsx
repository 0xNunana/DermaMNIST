"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface DropzoneProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileSelected, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      setPreview(URL.createObjectURL(file));
      onFileSelected(file);
    }
  };

  return (
    <div className="w-full relative group">
      {/* Animated glow background on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-cyan to-brand-blue rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
      
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-2xl p-8 cursor-pointer transition-all duration-300 ${
          dragActive
            ? "bg-brand-blue/10 border-2 border-brand-cyan shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            : "glass-panel border-white/10 hover:border-white/20"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={isLoading}
        />

        {preview ? (
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image src={preview} alt="Selected lesion" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-3 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium text-white/90">Click to replace</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${dragActive ? 'bg-brand-cyan/20 scale-110' : 'bg-white/5'}`}>
              <svg className={`w-8 h-8 transition-colors ${dragActive ? 'text-brand-cyan' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">
                <span className="text-brand-cyan">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500 mt-2 font-mono">PNG, JPG, WEBP (Max 10MB)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
