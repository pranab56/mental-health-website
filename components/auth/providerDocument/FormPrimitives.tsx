"use client";

import { useState } from "react";

/* ─────────────────────── utility ────────────────────────────────────────── */
export function cn(...args: (string | boolean | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

/* ─────────────────────── Reusable UI primitives ────────────────────────── */
export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide", className)}>
      {children}
    </label>
  );
}

export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[10px] text-red-500 mt-1 font-medium">
      {message}
    </p>
  );
}

export function Input({
  placeholder,
  value,
  onChange,
  className,
  error
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border bg-white text-sm text-gray-700 placeholder-gray-400 px-3 py-2.5",
          "focus:outline-none focus:ring-2 transition-all duration-200",
          error
            ? "border-red-400 focus:ring-red-100 focus:border-red-500"
            : "border-gray-200 focus:ring-violet-200 focus:border-violet-400",
          className
        )}
      />
      <ErrorMessage message={error} />
    </div>
  );
}

export function Textarea({
  placeholder,
  value,
  onChange,
  rows = 3,
  className,
  error
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
  error?: string;
}) {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full rounded-lg border bg-white text-sm text-gray-700 placeholder-gray-400 px-3 py-2.5 resize-none focus:outline-none focus:ring-2 transition-all duration-200",
          error
            ? "border-red-400 focus:ring-red-100 focus:border-red-500"
            : "border-gray-200 focus:ring-violet-200 focus:border-violet-400",
          className
        )}
      />
      <ErrorMessage message={error} />
    </div>
  );
}

export function Dropdown({
  value,
  onChange,
  options,
  placeholder,
  error
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center justify-between rounded-lg border bg-white px-3 py-2.5 text-sm transition-all focus:outline-none focus:ring-2",
          error
            ? "border-red-400 focus:ring-red-100 focus:border-red-500"
            : "border-gray-200 focus:ring-violet-200 focus:border-violet-400"
        )}
      >
        <span className={value ? "text-gray-700" : "text-gray-400"}>{value || placeholder}</span>
        <Chevron open={open} />
      </button>
      <ErrorMessage message={error} />
      {open && (
        <div
          className="absolute z-30 mt-1 w-full max-h-52 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => { onChange(o); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-primary transition-colors"
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      className={cn("text-gray-400 transition-transform duration-200", open && "rotate-180")}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">
      <p className="text-sm font-bold text-gray-800 mb-3">{title}</p>
      {children}
    </div>
  );
}

export function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

export function VideoUploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

export function DocUploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

/* ─────────────────────── Constants ──────────────────────────────────────── */
export const STATE_LIST = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

export const PROVIDER_TYPES = [
  "Psychologist",
  "Licensed Clinical Social Worker (LCSW)",
  "Licensed Professional Counselor (LPC)",
  "Psychiatrist",
  "Marriage & Family Therapist",
  "Other",
];

export const APPROACHES = [
  "Cognitive Behavioral Therapy (CBT)",
  "Dialectical Behavior Therapy (DBT)",
  "Psychodynamic",
  "Family Therapy",
  "EMDR",
  "Mindfulness-Based (MBCT)",
  "Acceptance & Commitment (ACT)",
];

export const POPULATIONS = [
  "Adolescents (13-17)",
  "Adults (18+)",
  "Seniors (65+)",
  "Divorce",
  "Depression",
  "Personality Disorder",
  "Trauma & PTSD",
  "Neurodivergence",
  "ADHD",
  "Anxiety",
  "Mood Disorder",
];

export const SESSION_OPTIONS = [
  "Online (Video)",
  "Session Lengths (min) 15 min",
  "Session Lengths (min) 30 min",
  "Session Lengths (min) 60 min",
  "Session Lengths (min) 90 min",
];

export const GRAD_YEARS = Array.from({ length: 40 }, (_, i) => String(2024 - i));
