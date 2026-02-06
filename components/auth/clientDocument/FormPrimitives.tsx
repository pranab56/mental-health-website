"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

/* ─────────────────────── Tiny shadcn‑style helpers ─────────────────────── */
export function cn(...args: (string | boolean | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}

/* ─────────────────────── Reusable UI primitives ────────────────────────── */
export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block text-xs font-semibold text-gray-500 mb-1.5 tracking-wide uppercase", className)}>
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
  type = "text",
  className,
  icon: Icon,
  error
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  icon?: any;
  error?: string;
}) {
  return (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
            <Icon size={15} />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg border bg-white text-sm text-gray-700 placeholder-gray-350",
            "focus:outline-none focus:ring-2 transition-all duration-200",
            error
              ? "border-red-400 focus:ring-red-100 focus:border-red-500"
              : "border-gray-200 focus:ring-violet-200 focus:border-violet-400",
            Icon ? "pl-9 pr-3 py-2.5" : "px-3 py-2.5",
            className
          )}
        />
      </div>
      <ErrorMessage message={error} />
    </div>
  );
}

export function Textarea({
  placeholder,
  value,
  onChange,
  className,
  error
}: {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  error?: string;
}) {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className={cn(
          "w-full rounded-lg border bg-white text-sm text-gray-700 placeholder-gray-400 px-3 py-2.5 resize-none",
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

export function SelectDropdown({
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
        <ChevronDown size={15} className={cn("text-gray-400 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div
          className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
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
      <ErrorMessage message={error} />
    </div>
  );
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold text-gray-800 mb-3">{children}</p>;
}
