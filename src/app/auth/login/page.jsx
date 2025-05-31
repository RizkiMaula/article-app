'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import AuthForm from '@/app/components/fragments/AuthForm';

// Schema validasi dengan Zod
const loginSchema = z.object({
  username: z.string().min(1, 'Username field cannot be empty'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const schema = loginSchema;
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
      const url = 'https://test-fe.mysellerpintar.com/api/auth/login';

      const response = await axios.post(url, data);

      // Simpan token dan role di localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userRole', response.data.role || 'user');

      // Redirect ke halaman profil
      router.push('/articles');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      isRegister={false}
      submitHandler={handleSubmit(onSubmit)}
      errorUsername={errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
      errorPassword={errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      errorMessage={errorMessage}
      registerUsername={register('username')}
      registerPassword={register('password')}
      isLoading={isLoading}
      text="Don't have an account?"
      link="Register here"
      page="/auth/register"
    />
  );
}
