"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const newErrors: { email?: string } = {};
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Reset link sent to:", email);
      setIsSent(true);
      toast.success("Reset link sent to your email!");
    } catch (error) {
      console.error("Reset error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Panel - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F9FAFB] relative flex-col justify-between p-12 overflow-hidden items-center justify-center">
        <div className='w-10/12 h-12/12 relative'>
          <Image src="/images/auth/login.png" alt="Forgot Password Background" fill className="" />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-white ">
        <div className="w-full max-w-[480px] p-6 sm:p-10 bg-white rounded-3xl shadow-none sm:shadow-xl border border-gray-100 sm:border-none">
          {isSent ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Check your email</h2>
              <p className="text-sm sm:text-base text-gray-500 mb-8 leading-relaxed">
                We&apos;ve sent a password reset link to <br /><span className="font-semibold text-gray-900">{email}</span>.
              </p>
              <Button
                variant="ghost"
                onClick={() => setIsSent(false)}
                className="text-[#9B85C1] hover:text-[#8A74B0] hover:bg-purple-50 font-semibold"
              >
                Resend link
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Reset Password
                </h2>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                  Enter your email and we&apos;ll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({});
                    }}
                    className={cn(
                      "h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 transition-all",
                      errors.email ? "focus-visible:ring-red-500 bg-red-50/50" : "focus-visible:ring-[#9B85C1]"
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.email}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#9B85C1] hover:bg-[#8A74B0] text-white rounded-xl text-base font-medium transition-all shadow-md group"
                >
                  {isLoading ? 'Sending...' : (
                    <span className="flex items-center gap-2">
                      Send Reset Link <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </>
          )}

          <div className="mt-10 flex justify-center">
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
