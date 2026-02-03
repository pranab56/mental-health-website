"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    } else if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email" });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Reset link sent to:", email);
      setIsSent(true);
    } catch (error) {
      console.error("Reset error:", error);
    } finally {
      setIsLoading(false);
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
            {isSent ? (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Check your email</h2>
                <p className="text-gray-600 mb-8">
                  We've sent a password reset link to <span className="font-semibold">{email}</span>.
                </p>
                <Button
                  variant="link"
                  onClick={() => setIsSent(false)}
                  className="text-purple-600 font-semibold"
                >
                  Resend link
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                  Reset Password
                </h2>
                <p className="text-gray-600 mb-10 text-center text-sm leading-relaxed">
                  Enter the email address associated with your account and we will send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({});
                      }}
                      className={`h-12 border-gray-200 rounded-lg bg-gray-50/50 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary cursor-pointer hover:bg-primary/80 text-white font-medium text-base rounded-lg shadow-sm transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Send Reset Link
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    )}
                  </Button>
                </form>
              </>
            )}

            <div className="mt-10 flex justify-center">
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

