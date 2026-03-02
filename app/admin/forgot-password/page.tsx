"use client";

import React, { useState } from 'react';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
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
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would send a reset email
      console.log('Password reset requested for:', email);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ submit: 'Failed to send reset link. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Back to Shop Link */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/shop"
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Shop
        </Link>
      </div>

      {/* Forgot Password Form */}
      <section className="flex min-h-screen bg-gray-900 px-4 py-16 md:py-32">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border border-gray-700 shadow-md shadow-zinc-950/5">
          <div className="bg-gray-800 -m-px rounded-[calc(var(--radius)+.125rem)] border border-gray-700 p-8 pb-6">
            <div className="text-center">
              <Link
                href="/admin"
                aria-label="go to admin"
                className="mx-auto block w-fit">
                <Image 
                  src="/wig.png" 
                  alt="Wigga Logo" 
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold text-white">
                Recover Password
              </h1>
              <p className="text-sm text-gray-400">
                Enter your email to receive a reset link
              </p>
            </div>

            {errors.submit && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                <p className="text-sm text-red-400">{errors.submit}</p>
              </div>
            )}

            {!isSubmitted ? (
              <div className="mt-6 space-y-6">
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
                    value={email}
                    onChange={handleChange}
                    placeholder="e.g myemail@gmail.com"
                    className={`${errors.email ? 'border-red-500' : 'border-slate-600 focus:border-slate-600 focus:border-2'} text-white`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            ) : (
              <div className="mt-6 text-center">
                <div className="p-4 bg-green-900/50 border border-green-700 rounded-lg">
                  <p className="text-sm text-green-400">
                    Reset link sent! Check your email.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">We'll send you a link to reset your password.</p>
            </div>
          </div>

          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <p className="text-accent-foreground text-center text-sm text-gray-400">
              Remembered your password?
              <Button
                asChild
                variant="link"
                className="px-2 text-blue-400 hover:text-blue-300">
                <Link href="/admin/login">Sign In</Link>
              </Button>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
