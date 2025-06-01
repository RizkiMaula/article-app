'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isOpen, onToggle, active }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Articles', href: '/articles', key: 'articles' },
    { name: 'Category', href: '/category', key: 'category' },
  ];

  return (
    <aside
      className={`$ {
        isOpen ? 'block' : 'hidden'
      } md:block bg-blue-700 text-white w-64 p-4 min-h-screen fixed md:relative z-10`}
    >
      <div className="flex justify-between items-center mb-6 md:hidden">
        <span className="text-xl font-bold">Logoipsum</span>
        <button onClick={onToggle}>
          <LogOut />
        </button>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`block px-4 py-2 rounded hover:bg-blue-600 ${active === item.key ? 'bg-blue-900 font-semibold' : ''}`}
          >
            {item.name}
          </Link>
        ))}
        <Link
          href="/logout"
          className="block px-4 py-2 rounded hover:bg-blue-600"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}
