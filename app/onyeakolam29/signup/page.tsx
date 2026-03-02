"use client";

import React, { useState } from 'react';
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function AdminSignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.adminCode.trim()) {
      newErrors.adminCode = 'Admin registration code is required';
    } else if (formData.adminCode !== 'WIGGA2024') {
      newErrors.adminCode = 'Invalid admin registration code';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store admin data (in a real app, this would be sent to your backend)
      const adminData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      
      console.log('Admin registered:', adminData);
      
      alert('Admin account created successfully! You can now sign in.');
      router.push('/admin');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
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
      {/* Back to Admin Link */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/shop"
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Shop
        </Link>
      </div>

      {/* Sign Up Form */}
      <section className="flex min-h-screen bg-gray-900 px-4 py-16 md:py-32">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 m-auto h-fit w-full max-w-md overflow-hidden rounded-[calc(var(--radius)+.125rem)] border border-gray-700 shadow-md shadow-zinc-950/5">
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
                Create Admin Account
              </h1>
              <p className="text-sm text-gray-400">
                Register for administrative access to Wigga
              </p>
            </div>

            {errors.submit && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                <p className="text-sm text-red-400">{errors.submit}</p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="block text-sm text-gray-300">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    required
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`${errors.firstName ? 'border-red-500' : 'border-slate-600 focus:border-slate-600 focus:border-2'} text-white`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="block text-sm text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    required
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`${errors.lastName ? 'border-red-500' : 'border-slate-600 focus:border-slate-600 focus:border-2'} text-white`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="block text-sm text-gray-300">
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminCode" className="block text-sm text-gray-300">
                  Admin Registration Code
                </Label>
                <Input
                  type="password"
                  required
                  name="adminCode"
                  id="adminCode"
                  value={formData.adminCode}
                  onChange={handleChange}
                  placeholder="Enter admin code"
                  className={`${errors.adminCode ? 'border-red-500' : 'border-slate-600 focus:border-slate-600 focus:border-2'} text-white`}
                />
                {errors.adminCode && (
                  <p className="text-xs text-red-500">{errors.adminCode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="block text-sm text-gray-300">
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="block text-sm text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input sz-md variant-mixed ${errors.confirmPassword ? 'border-red-500 pr-10' : 'border-slate-600 focus:border-slate-600 focus:border-2 pr-10'} text-white`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Admin Account'}
              </Button>
            </div>
          </div>

          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <p className="text-accent-foreground text-center text-sm text-gray-400">
              Already have an admin account?
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
