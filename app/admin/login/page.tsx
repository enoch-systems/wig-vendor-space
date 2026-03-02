"use client";

import React, { useState } from 'react';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function AdminSignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would verify credentials with your backend
      // For demo purposes, we'll accept any email/password
      if (formData.email && formData.password) {
        // Store admin session (in a real app, this would be a JWT token)
        const adminSession = {
          email: formData.email,
          role: 'admin',
          loginTime: new Date().toISOString()
        };
        
        // Store in localStorage (in production, use secure cookies)
        localStorage.setItem('adminSession', JSON.stringify(adminSession));
        
        console.log('Admin signed in:', adminSession);
        
        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setErrors({ submit: 'Sign in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Exit Link */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => window.close()}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Exit
        </button>
      </div>

      {/* Sign In Form */}
      <section className="flex min-h-screen bg-gray-900 px-4 py-16 md:py-32">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border border-gray-700 p-0.5 shadow-md">
          <div className="p-8 pb-6">
            <div className="text-center">
              <Link
                href="/admin"
                aria-label="go to admin dashboard"
                className="inline-block">
                <Image 
                  src="/wig.png" 
                  alt="Wigga Logo" 
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold text-white">
                Admin Sign In
              </h1>
              <p className="text-sm text-gray-400 pb-5">
                Welcome back! Sign in to access admin panel
              </p>
            </div>

            {errors.submit && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                <p className="text-sm text-red-400">{errors.submit}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="block text-sm text-gray-300">
                  Email Address
                </Label>
                <Input
                  type="email"
                  required
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${errors.email ? 'border-red-500' : 'border-slate-600 focus:border-slate-600 focus:border-2'} text-white`}
                  placeholder="e.g myemail@gmail.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input sz-md variant-mixed ${errors.password ? 'border-red-500 pr-10' : 'border-slate-600 focus:border-slate-600 focus:border-2 pr-10'} text-white`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300">
                    <Link href="/admin/forgot-password">
                      Forgot Password?
                    </Link>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </div>

          </form>
      </section>
    </div>
  );
}
