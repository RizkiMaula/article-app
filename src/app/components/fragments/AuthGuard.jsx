'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children, requiredRoles = [] }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      router.push('/unauthorized');
      return;
    }

    setAuthorized(true);
  }, []);

  if (!authorized) return null; // bisa juga ganti dengan loading spinner

  return <>{children}</>;
}
