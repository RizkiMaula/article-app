'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Logo from './Logo';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function Header({ position = 'absolute', flexLogo = 'items-center' }) {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetch('https://test-fe.mysellerpintar.com/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthorized');
        const data = await res.json();
        setUsername(data.username);
      })
      .catch((err) => {
        console.error('Auth failed:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setUsername(null);
      });
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Yakin logout?',
      text: 'Kamu akan keluar dari akunmu',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      setUsername(null);
      router.push('/auth/login');
    }
  };

  const handleMyAccount = () => {
    router.push('/profile');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <header className={`border-b py-4 px-6 flex justify-between items-center border-2 border-black w-full z-50 ${position === 'fixed' ? 'fixed top-0' : ''}`}>
      <Link
        href="/"
        className="flex items-center gap-2"
      >
        <Logo />
      </Link>
      {/* User section */}
      <div className="flex items-center mr-4">
        {/* Avatar huruf depan */}
        <div className="flex items-center justify-center w-8 h-8 mr-2 bg-gray-200 border-2 border-dashed rounded-full">
          <span className="text-xs text-gray-500">{username ? username.charAt(0).toUpperCase() : 'U'}</span>
        </div>

        {/* Jika login */}
        {username ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                className={`font-bold ${flexLogo} mr-4`}
                variant="link"
              >
                {username}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-56 p-2 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleMyAccount}
              >
                My Account
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500"
                onClick={handleLogout}
              >
                <LogOut /> Logout
              </Button>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <Button
            className={`font-bold ${flexLogo} mr-4`}
            variant="link"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
