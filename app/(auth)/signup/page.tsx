"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("client");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validate = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};

    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms";
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
      console.log("Sign up with:", { email, password, accountType });
      toast.success("Account created successfully!");
      if (accountType === "client") {
        router.push("/signup/client-document");
      } else {
        router.push("/signup/provider-document");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("An error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Panel - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F9FAFB] relative flex-col justify-between p-12 overflow-hidden items-center justify-center">
        <div className='w-10/12 h-12/12 relative'>
          <Image src="/images/auth/login.png" alt="Signup Background" fill className="" />
        </div>
      </div>

      {/* Right Panel - SignUp Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-white ">
        <div className="w-full max-w-[520px] p-6 sm:p-10 bg-white rounded-3xl shadow-none sm:shadow-xl border border-gray-100 sm:border-none">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Create your account
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Enter your details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className='space-y-2 w-full'>
              <label className="text-sm font-semibold text-gray-700">Account Type</label>
              <Select value={accountType} onValueChange={setAccountType}>
                <SelectTrigger className="h-12 bg-[#F9FAFB] border-none w-full py-6 rounded-xl focus:ring-1 focus:ring-[#9B85C1] transition-all">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">I am Client</SelectItem>
                  <SelectItem value="provider">I am Provider</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Work Email</label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={cn(
                      "h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 transition-all pr-10",
                      errors.password ? "focus-visible:ring-red-500 bg-red-50/50" : "focus-visible:ring-[#9B85C1]"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                    }}
                    className={cn(
                      "h-12 bg-[#F9FAFB] border-none rounded-xl focus-visible:ring-1 transition-all pr-10",
                      errors.confirmPassword ? "focus-visible:ring-red-500 bg-red-50/50" : "focus-visible:ring-[#9B85C1]"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs font-medium text-red-500 mt-1 ml-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => {
                  setAgreeTerms(checked as boolean);
                  if (errors.terms) setErrors({ ...errors, terms: undefined });
                }}
                className="mt-1 border-gray-300 data-[state=checked]:bg-[#9B85C1] data-[state=checked]:border-[#9B85C1]"
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-500 leading-tight font-normal cursor-pointer"
              >
                I agree to the <Link href="/terms" className="text-[#9B85C1] hover:underline font-medium">Terms of Service</Link> and <Link href="/privacy" className="text-[#9B85C1] hover:underline font-medium">Privacy Policy</Link>.
              </label>
            </div>
            {errors.terms && (
              <p className="text-xs font-medium text-red-500">{errors.terms}</p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#9B85C1] hover:bg-[#8A74B0] text-white rounded-xl text-base font-medium transition-all shadow-md group mt-2"
            >
              {isLoading ? 'Creating Account...' : (
                <span className="flex items-center gap-2">
                  Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#5aa8a9] hover:text-[#4a8a8b] font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
