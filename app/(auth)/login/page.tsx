"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const router = useRouter();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      if(email === 'my@gmail.com' && password === 'hello123') {
        toast.success('Login successful!');
        router.push('/my-dashboard');
      } else if(email === 'provider@gmail.com' && password === 'hello123') {
        toast.success('Login successful!');
        router.push('/provider');
      } 
      else {
        toast.error('Invalid email or password!');
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Panel - Feature Showcase */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F9FAFB] relative flex-col justify-between p-12 overflow-hidden items-center justify-center">
        {/* Background Decorative Elements could go here */}
        <div className='w-10/12 h-12/12 relative'>
          <Image src="/images/auth/login.png" alt="Login Background" fill className="" />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-white ">
        <div className="w-full max-w-[480px] p-6 sm:p-10 bg-white rounded-3xl shadow-none sm:shadow-xl border border-gray-100 sm:border-none">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-sm sm:text-base text-gray-500">Please enter your details to login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
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
                <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
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
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-[#5aa8a9] hover:text-[#4a8a8b] font-medium">
                Forget Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#9B85C1] hover:bg-[#8A74B0] text-white rounded-xl text-base font-medium transition-all shadow-md group"
            >
              {isLoading ? 'Logging in...' : (
                <span className="flex items-center gap-2">
                  Login <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>
          <div className="text-center mt-4 text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#5aa8a9] hover:text-[#4a8a8b] font-medium">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
