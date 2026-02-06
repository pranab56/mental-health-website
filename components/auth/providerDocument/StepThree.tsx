"use client";

import { useRef, useState } from "react";
import {
  APPROACHES,
  cn,
  POPULATIONS,
  Section,
  SESSION_OPTIONS
} from "./FormPrimitives";

export default function StepThree({ d, s, errors }: { d: any, s: any, errors: Record<string, string> }) {
  /* ── Therapeutic Approaches (pill-chip multi-select + Add Other) ── */
  const toggleApproach = (a: string) => {
    const cur = d.approaches || [];
    s((p: any) => ({
      ...p,
      approaches: cur.includes(a) ? cur.filter((x: string) => x !== a) : [...cur, a],
    }));
  };

  const [addingOther, setAddingOther] = useState(false);
  const [otherVal, setOtherVal] = useState("");
  const otherRef = useRef<HTMLInputElement>(null);

  const commitOther = () => {
    if (otherVal.trim()) {
      s((p: any) => ({ ...p, approaches: [...(p.approaches || []), otherVal.trim()] }));
    }
    setOtherVal("");
    setAddingOther(false);
  };

  /* ── Populations grid (two-col checkboxes) ── */
  const togglePop = (p_val: string) => {
    const cur = d.populations || [];
    s((prev: any) => ({
      ...prev,
      populations: cur.includes(p_val) ? cur.filter((x: string) => x !== p_val) : [...cur, p_val],
    }));
  };

  /* ── Session / Other grid ── */
  const toggleSession = (o: string) => {
    const cur = d.sessions || [];
    s((prev: any) => ({
      ...prev,
      sessions: cur.includes(o) ? cur.filter((x: string) => x !== o) : [...cur, o],
    }));
  };

  return (
    <div key="step3">
      {/* Therapeutic Approaches */}
      <Section title="Therapeutic Approaches">
        <div className="flex flex-wrap gap-2">
          {APPROACHES.map((a) => {
            const sel = (d.approaches || []).includes(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => toggleApproach(a)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                  sel
                    ? "border-violet-500 bg-violet-100 text-primary"
                    : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:bg-violet-50"
                )}
              >
                {a}
              </button>
            );
          })}

          {/* dynamic "other" chips already added */}
          {((d.approaches || []).filter((a: string) => !APPROACHES.includes(a))).map((a: string) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleApproach(a)}
              className="rounded-full border border-violet-500 bg-violet-100 text-primary px-3.5 py-1.5 text-xs font-medium transition-all duration-200"
            >
              {a}
            </button>
          ))}

          {/* Add Other button / input */}
          {!addingOther ? (
            <button
              type="button"
              onClick={() => { setAddingOther(true); setTimeout(() => otherRef.current?.focus(), 60); }}
              className="rounded-full border-2 border-dashed border-violet-300 text-primary px-3.5 py-1.5 text-xs font-medium hover:border-violet-500 hover:text-primary transition-colors"
            >
              + Add Other
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <input
                ref={otherRef}
                autoFocus
                value={otherVal}
                onChange={(e) => setOtherVal(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commitOther(); } if (e.key === "Escape") { setAddingOther(false); setOtherVal(""); } }}
                placeholder="Type & press Enter"
                className="rounded-full border border-violet-300 bg-white px-3 py-1.5 text-xs text-primary placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-200 w-44"
              />
              <button type="button" onClick={commitOther} className="text-primary hover:text-primary/80 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              </button>
              <button type="button" onClick={() => { setAddingOther(false); setOtherVal(""); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          )}
        </div>
        {errors.approaches && <p className="text-[10px] text-red-500 mt-3 font-medium">{errors.approaches}</p>}
      </Section>

      {/* Client Population */}
      <Section title="Client Population">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
          {POPULATIONS.map((p) => {
            const sel = (d.populations || []).includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => togglePop(p)}
                className={cn(
                  "flex items-center justify-between w-full py-2.5 border-b border-gray-100 last:border-0 group",
                )}
              >
                <span className={cn("text-sm transition-colors", sel ? "text-primary font-medium" : "text-gray-600 group-hover:text-gray-800")}>
                  {p}
                </span>
                {/* checkbox */}
                <div className={cn(
                  "w-5 h-5 rounded flex items-center justify-center border transition-all duration-200",
                  sel ? "bg-primary border-primary" : "border-gray-300 bg-white"
                )}>
                  {sel && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.populations && <p className="text-[10px] text-red-500 mt-2 font-medium">{errors.populations}</p>}
      </Section>

      {/* Other – session format / lengths */}
      <Section title="Other">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
          {SESSION_OPTIONS.map((o) => {
            const sel = (d.sessions || []).includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggleSession(o)}
                className="flex items-center justify-between w-full py-2.5 border-b border-gray-100 last:border-0 group"
              >
                <span className={cn("text-sm transition-colors", sel ? "text-primary font-medium" : "text-gray-600 group-hover:text-gray-800")}>
                  {o}
                </span>
                <div className={cn(
                  "w-5 h-5 rounded flex items-center justify-center border transition-all duration-200",
                  sel ? "bg-primary border-primary" : "border-gray-300 bg-white"
                )}>
                  {sel && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {errors.sessions && <p className="text-[10px] text-red-500 mt-2 font-medium">{errors.sessions}</p>}
      </Section>
    </div>
  );
}
