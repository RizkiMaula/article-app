'use client';

import Logo from '@/app/components/fragments/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthForm({
  isRegister = true,
  errorUsername,
  errorPassword,
  errorRole,
  submitHandler,
  errorMessage,
  registerUsername,
  registerPassword,
  registerRole,
  control,
  isLoading = false,
  page = '/auth/login',
  text = 'Already have an account?',
  link = 'Login here',
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center md:bg-gray-100 bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 py-8 bg-white shadow-md rounded-xl">
        <div className="flex justify-center">
          <Logo />
        </div>

        <form
          className="mt-8 space-y-6 px-4"
          onSubmit={submitHandler}
        >
          {errorMessage && <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">{errorMessage}</div>}

          <div className="space-y-4">
            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                {...registerUsername}
                placeholder="Input username"
              />
              {errorUsername}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...registerPassword}
                  placeholder="Input Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
              {errorPassword}
            </div>

            {/* Role hanya jika isRegister */}
            {isRegister && control && (
              <div>
                <Label htmlFor="role">Role</Label>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errorRole}
              </div>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
            </Button>
          </div>
        </form>

        <div className="text-center flex items-center justify-center">
          <p>{text}</p>
          <Link
            href={page}
            className="text-blue-600 hover:text-blue-500 underline ml-1"
          >
            {link}
          </Link>
        </div>
      </div>
    </div>
  );
}
