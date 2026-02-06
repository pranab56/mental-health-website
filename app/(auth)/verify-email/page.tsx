"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    // Take only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // If a value was entered, move to the next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setActiveInput(index - 1);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Verifying OTP:", code);
      toast.success("Email verified successfully!");
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Invalid verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(59);
      console.log("Resending OTP...");
      toast.success("New code sent to your email!");
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Panel - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F9FAFB] relative flex-col justify-between p-12 overflow-hidden items-center justify-center">
        <div className='w-10/12 h-12/12 relative'>
          <Image src="/images/auth/login.png" alt="Login Background" fill className="" />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-white ">
        <div className="w-full max-w-[480px] p-6 sm:p-10 bg-white rounded-3xl shadow-none sm:shadow-xl border border-gray-100 sm:border-none">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Verify Email
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Please enter the 6-digit verification code sent to your email.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-between gap-2 max-w-sm mx-auto">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  value={data}
                  onFocus={() => setActiveInput(index)}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={cn(
                    "w-11 h-12 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold border-none rounded-xl bg-[#F9FAFB] outline-none transition-all flex items-center justify-center",
                    activeInput === index ? "ring-1 ring-[#9B85C1] bg-white" : "",
                    data ? "bg-white ring-1 ring-[#9B85C1]" : ""
                  )}
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.join("").length < 6}
              className="w-full h-12 bg-[#9B85C1] hover:bg-[#8A74B0] text-white rounded-xl text-base font-medium transition-all shadow-md group"
            >
              {isLoading ? 'Verifying...' : (
                <span className="flex items-center gap-2">
                  Verify & Proceed <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-2">Didn&apos;t receive the code?</p>
            <button
              onClick={handleResend}
              disabled={timer > 0}
              className={cn(
                "text-sm font-semibold transition-colors",
                timer > 0 ? "text-gray-300 cursor-not-allowed" : "text-[#9B85C1] hover:text-[#8A74B0]"
              )}
            >
              {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
            </button>
          </div>

          <div className="mt-10 flex justify-center pt-6 border-t border-gray-100">
            <Link
              href="/login"
              className="flex items-center text-sm font-medium text-[#5aa8a9] hover:text-[#4a8a8b] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
