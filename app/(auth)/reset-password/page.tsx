"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Password updated successfully");
      setIsSuccess(true);
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
            {isSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Success!</h2>
                <p className="text-gray-600 mb-8">
                  Your password has been updated successfully. You can now log in with your new password.
                </p>
                <Link href="/login">
                  <Button className="w-full h-12 bg-secondary cursor-pointer hover:bg-secondary/80 text-white font-medium rounded-lg">
                    Proceed to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                  Create New Password
                </h2>
                <p className="text-gray-600 mb-10 text-center text-sm leading-relaxed">
                  Please enter a new password for your account. Make sure it's at least 8 characters long and includes a mix of characters.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors({ ...errors, password: undefined });
                        }}
                        className={`h-12 pr-10 border-gray-200 rounded-lg bg-gray-50/50 ${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                        }}
                        className={`h-12 pr-10 border-gray-200 rounded-lg bg-gray-50/50 ${errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.confirmPassword}</p>
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
                        Updating...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        Update Password
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    )}
                  </Button>
                </form>
              </>
            )}

            <div className="mt-10 flex justify-center pt-6 border-t">
              <Link
                href="/login"
                className="flex items-center text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to login
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
