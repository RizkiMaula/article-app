import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const title = pathname.includes('articles') ? 'Articles' : 'Categories';

  return (
    <div className="border-b p-4 bg-white">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
