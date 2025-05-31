'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthForm from '@/app/components/fragments/AuthForm';

// Schema validasi dengan Zod

const registerSchema = z.object({
  username: z.string().min(1, 'Username field cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.string().min(1, 'Role must be selected'),
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const schema = registerSchema;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      role: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const url = 'https://test-fe.mysellerpintar.com/api/auth/register';

      const response = await axios.post(url, data);

      // Redirect ke halaman profil
      alert('Registration successful. Please log in.');
      router.push('/auth/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-md w-full space-y-8">
    //     <div>
    //       <Logo />
    //     </div>

    //     <form
    //       className="mt-8 space-y-6"
    //       onSubmit={handleSubmit(onSubmit)}
    //     >
    //       {errorMessage && <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">{errorMessage}</div>}

    //       <div className="space-y-4">
    //         {/* Username */}
    //         <div>
    //           <Label htmlFor="username">Username</Label>
    //           <Input
    //             id="username"
    //             type="text"
    //             autoComplete="username"
    //             {...register('username')}
    //             placeholder="Enter your username"
    //             className={`mt-1 ${errors.username ? 'border-red-500' : ''}`}
    //           />
    //           {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
    //         </div>

    //         {/* Password dengan icon mata */}
    //         <div>
    //           <Label htmlFor="password">Password</Label>
    //           <div className="relative mt-1">
    //             <Input
    //               id="password"
    //               type={showPassword ? 'text' : 'password'}
    //               autoComplete="current-password"
    //               {...register('password')}
    //               placeholder="Enter your password"
    //               className={`w-full ${errors.password ? 'border-red-500' : ''}`}
    //             />
    //             <button
    //               type="button"
    //               className="absolute inset-y-0 right-0 pr-3 flex items-center"
    //               onClick={() => setShowPassword(!showPassword)}
    //             >
    //               {showPassword ? (
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="h-5 w-5 text-gray-400"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    //                   />
    //                 </svg>
    //               ) : (
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   className="h-5 w-5 text-gray-400"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   stroke="currentColor"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //                   />
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    //                   />
    //                 </svg>
    //               )}
    //             </button>
    //           </div>
    //           {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
    //         </div>

    //         {/* Role (hanya untuk register) */}
    //         <div>
    //           <Label htmlFor="role">Role</Label>
    //           <Controller
    //             name="role"
    //             control={control}
    //             render={({ field }) => (
    //               <Select
    //                 onValueChange={field.onChange}
    //                 value={field.value}
    //               >
    //                 <SelectTrigger className="mt-1">
    //                   <SelectValue placeholder="Select your role" />
    //                 </SelectTrigger>
    //                 <SelectContent>
    //                   <SelectGroup>
    //                     <SelectItem value="Admin">Admin</SelectItem>
    //                     <SelectItem value="User">User</SelectItem>
    //                   </SelectGroup>
    //                 </SelectContent>
    //               </Select>
    //             )}
    //           />
    //           {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
    //         </div>
    //       </div>

    //       <div>
    //         <Button
    //           type="submit"
    //           className="w-full"
    //           disabled={isLoading}
    //         >
    //           {isLoading ? (
    //             <span className="flex items-center justify-center">
    //               <svg
    //                 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <circle
    //                   className="opacity-25"
    //                   cx="12"
    //                   cy="12"
    //                   r="10"
    //                   stroke="currentColor"
    //                   strokeWidth="4"
    //                 ></circle>
    //                 <path
    //                   className="opacity-75"
    //                   fill="currentColor"
    //                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //                 ></path>
    //               </svg>
    //               Processing...
    //             </span>
    //           ) : (
    //             'Create account'
    //           )}
    //         </Button>
    //       </div>
    //     </form>

    //     <div className="text-center flex items-center justify-center">
    //       <p>Already have an account? </p>
    //       <Link
    //         href="/auth/login"
    //         className=" text-blue-600 hover:text-blue-500 underline"
    //       >
    //         {' '}
    //         Sign in
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <AuthForm
      isRegister={true}
      submitHandler={handleSubmit(onSubmit)}
      errorUsername={errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
      errorPassword={errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      errorRole={errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
      errorMessage={errorMessage}
      registerUsername={register('username')}
      registerPassword={register('password')}
      registerRole={register('role')}
      control={control}
      isLoading={isLoading}
      text="Already have an account?"
      link="Login here"
      page="/auth/login"
    />
  );
}
