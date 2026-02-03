"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Verifying OTP:", code);
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(59);
      console.log("Resending OTP...");
    }
  };

  return (
    <div className="h-screen flex overflow-hidden container mx-auto">
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative m-4 overflow-hidden"
      >
        <Image
          src="/images/auth/login.png"
          alt="Branding"
          width={1000}
          height={1000}
          className="w-full h-full"
        />
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-5/12 flex items-center justify-center p-4"
      >
        <div className="w-full px-8 md:px-16 py-12 bg-white flex flex-col justify-center rounded-xl shadow-lg border border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Verify Email
            </h2>
            <p className="text-gray-600 mb-10 text-center text-sm leading-relaxed">
              Please enter the 6-digit verification code sent to your email.
            </p>

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
                    className={`w-11 h-12 text-center text-xl font-bold border-2 rounded-lg bg-gray-50/50 outline-none transition-all
                      ${activeInput === index ? "border-purple-600 ring-2 ring-purple-100" : "border-gray-200"}
                      ${data ? "border-purple-500 bg-white" : ""}
                    `}
                  />
                ))}
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="w-full h-12 bg-primary cursor-pointer hover:bg-primary/80 text-white font-medium text-base rounded-lg shadow-sm transition-all"
                  disabled={isLoading || otp.join("").length < 6}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Verify & Proceed
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
              <button
                onClick={handleResend}
                disabled={timer > 0}
                className={`text-sm font-semibold transition-colors ${timer > 0 ? "text-gray-300 cursor-not-allowed" : "text-purple-600 hover:text-purple-700"
                  }`}
              >
                {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
              </button>
            </div>

            <div className="mt-10 flex justify-center border-t pt-6">
              <Link
                href="/login"
                className="flex items-center text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
