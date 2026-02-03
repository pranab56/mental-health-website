"use client";

import { cn } from "@/components/auth/clientDocument/FormPrimitives";
import StepFive from "@/components/auth/clientDocument/StepFive";
import StepFour from "@/components/auth/clientDocument/StepFour";
import StepOne from "@/components/auth/clientDocument/StepOne";
import StepThree from "@/components/auth/clientDocument/StepThree";
import StepTwo from "@/components/auth/clientDocument/StepTwo";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check
} from "lucide-react";
import { useState } from "react";

/* ─────────────────────── Progress bar ──────────────────────────────────── */
const STEPS = ["Profile", "Preferences", "Insurance", "Health", "Concerns"];

function ProgressBar({ current }: { current: number }) {
  const pct = ((current) / (STEPS.length - 1)) * 100;
  return (
    <div className="mb-6">
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <div className="flex justify-between mt-2.5">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={cn(
              "text-[10px] sm:text-xs font-medium transition-colors duration-300",
              i <= current ? "text-primary" : "text-gray-350"
            )}
          >
            {i + 1}. {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────── MAIN FORM ─────────────────────────────────────── */
const INITIAL = {
  // Step 1
  name: "", email: "", phone: "", dob: "", gender: "", language: "English",
  ecName: "", ecPhone: "", ecRel: "",
  street: "", city: "", zip: "", country: "",
  // Step 2
  thGender: "", thType: "", sessionFmt: "", approach: "", frequency: "",
  // Step 3
  insProvider: "", memberId: "", groupNum: "", payment: "",
  // Step 4
  physician: "", physPhone: "", meds: "", diagnoses: "", pastTherapy: "",
  // Step 5
  reason: "", goal: "",
};

export default function ClientIntakeForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (s: number) => {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (!data.name) newErrors.name = "Full name is required";
      if (!data.email) newErrors.email = "Email is required";
      if (!data.phone) newErrors.phone = "Phone number is required";
      if (!data.dob) newErrors.dob = "Date of birth is required";
      if (!data.gender) newErrors.gender = "Gender is required";
      if (!data.ecName) newErrors.ecName = "Emergency contact name is required";
      if (!data.ecPhone) newErrors.ecPhone = "Emergency contact phone is required";
      if (!data.ecRel) newErrors.ecRel = "Relationship is required";
      if (!data.street) newErrors.street = "Street address is required";
      if (!data.city) newErrors.city = "City is required";
      if (!data.zip) newErrors.zip = "Zip code is required";
      if (!data.country) newErrors.country = "Country is required";
    } else if (s === 1) {
      if (!data.thGender) newErrors.thGender = "Therapist gender preference is required";
      if (!data.thType) newErrors.thType = "Therapy type is required";
      if (!data.sessionFmt) newErrors.sessionFmt = "Session format is required";
      if (!data.approach) newErrors.approach = "Preferred approach is required";
      if (!data.frequency) newErrors.frequency = "Session frequency is required";
    } else if (s === 2) {
      if (!data.insProvider) newErrors.insProvider = "Insurance provider is required";
      if (!data.memberId) newErrors.memberId = "Member ID is required";
      if (!data.groupNum) newErrors.groupNum = "Group number is required";
      if (!data.payment) newErrors.payment = "Payment method is required";
    } else if (s === 3) {
      if (!data.physician) newErrors.physician = "Physician name is required";
      if (!data.physPhone) newErrors.physPhone = "Physician phone is required";
    } else if (s === 4) {
      if (!data.reason) newErrors.reason = "Reason for seeking therapy is required";
      if (!data.goal) newErrors.goal = "Primary goal is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 4));
    }
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    if (validateStep(step)) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-10 text-center"
        >
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={30} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Submission Successful!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Thank you, {data.name || "client"}. Your intake form has been received. A therapist will be matched to you shortly.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep(0); setData(INITIAL); setErrors({}); }}
            className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary/80 transition-colors"
          >
            Start Over
          </button>
        </motion.div>
      </div>
    );
  }

  const stepComponents = [
    <StepOne key="p" data={data} setData={setData} errors={errors} />,
    <StepTwo key="pr" data={data} setData={setData} errors={errors} />,
    <StepThree key="i" data={data} setData={setData} errors={errors} />,
    <StepFour key="h" data={data} setData={setData} errors={errors} />,
    <StepFive key="c" data={data} setData={setData} errors={errors} />,
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 pt-8 pb-12">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-5xl mx-auto w-full p-5 sm:p-7 pb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Client Intake Form</h1>
            <p className="text-xs text-gray-400 mt-0.5">Please provide your personal and emergency contact information.</p>
          </div>
          <span className="text-xs font-semibold text-primary bg-violet-50 px-2.5 py-1 rounded-full whitespace-nowrap">
            Step {step + 1} of 5: {STEPS[step]}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-4 mb-5">
          <ProgressBar current={step} />
        </div>

        {/* Animated step content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {stepComponents[step]}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between mt-7 pt-4 border-t border-gray-100">
          <button
            onClick={goBack}
            disabled={step === 0}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium cursor-pointer transition-colors",
              step === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-primary"
            )}
          >
            <ArrowLeft size={15} /> Back
          </button>
          <button
            onClick={step === 4 ? handleSubmit : goNext}
            className="bg-primary hover:bg-primary/80 cursor-pointer active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-150 shadow-sm shadow-violet-200"
          >
            {step === 4 ? "Save & Submit" : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
