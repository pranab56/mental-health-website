"use client";

import { cn } from "@/components/auth/providerDocument/FormPrimitives";
import StepOne from "@/components/auth/providerDocument/StepOne";
import StepThree from "@/components/auth/providerDocument/StepThree";
import StepTwo from "@/components/auth/providerDocument/StepTwo";
import { ProviderIntakeFormData } from "@/components/auth/providerDocument/types";
import { useState } from "react";

/* ══════════════════════════ CONSTANTS ════════════════════════ */
const STEPS = ["Profile", "Background", "Therapy Details"];

/* ── progress bar ── */
function ProgressBar({ current }: { current: number }) {
  const pct = (current / (STEPS.length - 1)) * 100;
  return (
    <div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-2.5">
        {STEPS.map((s, i) => (
          <span key={s} className={cn("text-[10px] sm:text-xs font-medium transition-colors duration-300", i <= current ? "text-primary" : "text-gray-400")}>
            {i + 1}. {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════ SUCCESS SCREEN ═══════════════════ */
function SuccessScreen({ name, onReset }: { name: string; onReset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-8 sm:p-10 text-center"
      >
        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Provider Registered!</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Thank you{name ? `, ${name}` : ""}. Your provider profile has been submitted and is under review.
        </p>
        <button
          onClick={onReset}
          className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary/80 transition-colors cursor-pointer"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}

const INITIAL: ProviderIntakeFormData = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  office: "",
  degree: "",
  gradYear: "",
  license: "",
  state: "",
  type: "",
  approaches: [],
  populations: [],
  sessions: [],
  profilePhoto: null,
  profPhotoMedia: null,
  profVideoMedia: null,
  cvFile: null,
  licenseFile: null,
};

export default function ProviderIntakeForm() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<ProviderIntakeFormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validateStep = (s: number) => {
    const err: Record<string, string> = {};
    if (s === 0) {
      if (!d.name) err.name = "Full name is required";
      if (!d.email) err.email = "Email is required";
      if (!d.phone) err.phone = "Phone is required";
      if (!d.dob) err.dob = "DOB is required";
      if (!d.gender) err.gender = "Gender is required";
      if (!d.office) err.office = "Office address is required";
    } else if (s === 1) {
      if (!d.degree) err.degree = "Degree is required";
      if (!d.gradYear) err.gradYear = "Graduation year is required";
      if (!d.license) err.license = "License number is required";
      if (!d.state) err.state = "State is required";
      if (!d.type) err.type = "Provider type is required";
    } else if (s === 2) {
      if (!d.approaches?.length) err.approaches = "Select at least one approach";
      if (!d.populations?.length) err.populations = "Select at least one population";
      if (!d.sessions?.length) err.sessions = "Select at least one session option";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (done) return <SuccessScreen name={d.name || ""} onReset={() => { setDone(false); setStep(0); setD({}); setErrors({}); }} />;

  const pages = [
    <StepOne key="1" d={d} s={setD} errors={errors} />,
    <StepTwo key="2" d={d} s={setD} errors={errors} />,
    <StepThree key="3" d={d} s={setD} errors={errors} />,
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-3 sm:p-4 pt-6 sm:pt-10 pb-12">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-5xl p-4 sm:p-8 pb-6 sm:pb-8">
        {/* header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Provider Intake Form</h1>
            <p className="text-xs text-gray-400 mt-1">Please provide your professional and academic information.</p>
          </div>
          <span className="text-[10px] sm:text-xs font-semibold text-primary bg-violet-50 px-3 py-1.5 rounded-full whitespace-nowrap">
            Step {step + 1} of 3: {STEPS[step]}
          </span>
        </div>

        {/* progress */}
        <div className="mb-6 sm:mb-8">
          <ProgressBar current={step} />
        </div>

        {/* content area */}
        <div className="min-h-[300px] sm:min-h-[400px]">
          {pages[step]}
        </div>

        {/* footer nav */}
        <div className="flex items-center justify-between mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium cursor-pointer transition-colors",
              step === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-primary"
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            type="button"
            onClick={step === 2 ? () => { if (validateStep(step)) { setDone(true); window.scrollTo({ top: 0, behavior: 'smooth' }); } } : goNext}
            className="bg-primary hover:bg-primary/80 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-150 shadow-md shadow-violet-100 active:scale-95"
          >
            {step === 2 ? "Save & Submit" : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
