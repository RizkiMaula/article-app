'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/fragments/Footer';
import { Button } from '@/components/ui/button';
import Header from '../components/fragments/Header';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    // Jika tidak ada token atau role, redirect
    if (!token || !role) {
      router.push('/auth/login');
      return;
    }

    // Fetch data user dari API
    fetch('https://test-fe.mysellerpintar.com/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Gagal mengambil profil');
        const data = await res.json();
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
        router.push('/unauthorized');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return <div className="p-4">Tidak bisa mengambil data user.</div>;
  }

  const firstInitial = user.username?.charAt(0)?.toUpperCase();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      {/* <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between h-14">
        <div className="flex items-center ml-4">
          <Image
            src={logo}
            alt="Logo"
            width={102}
            height={100}
            className="w-auto h-8"
          />
        </div>

        <div className="flex items-center mr-4">
          <div className="flex items-center justify-center w-8 h-8 mr-2 bg-gray-200 border-2 border-dashed rounded-full">
            <span className="text-xs text-gray-500">U</span>
          </div>
          <span className="font-medium text-white">User</span>
        </div>
      </div> */}
      <Header
        position={`static`}
        flexLogo="item-start"
      />

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {/* Lingkaran huruf depan */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">{firstInitial}</div>
        </div>
        {/* Informasi profil */}
        <div className="flex flex-col gap-3 pb-6">
          <div className="text-center flex items-center justify-start gap-4 pl-5 bg-gray-200 ">
            <h2 className="text-lg font-semibold"> Username : </h2>
            <h2 className="text-lg font-semibold"> {user.username}</h2>
          </div>
          <div className="text-center flex items-center justify-start gap-4 pl-5 bg-gray-200">
            <h2 className="text-lg font-semibold"> Password : </h2>
            <h2 className="text-lg font-semibold"> ********</h2>
          </div>
          <div className="text-center flex items-center justify-start gap-4 pl-5 bg-gray-200">
            <h2 className="text-lg font-semibold"> Role : </h2>
            <h2 className="text-lg font-semibold"> {user.role}</h2>
          </div>
        </div>

        <Button className="w-full bg-blue-600"> Back to Home </Button>
      </div>
      <Footer className="bottom-0" />
    </div>
  );
}
