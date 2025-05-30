'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input.jsx';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';

export default function FilterBar({ categories, initialCategory, initialSearch }) {
  const [category, setCategory] = useState(initialCategory || 'all');
  const [search, setSearch] = useState(initialSearch || '');
  const router = useRouter();

  // debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (category && category !== 'all') params.set('category', category);
      if (search) params.set('search', search);
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [category, search, router]);

  return (
    <div className="z-10 flex flex-col w-full max-w-4xl gap-2 p-1 sm:flex-row sm:items-center">
      {/* Category Select */}
      <Select
        onValueChange={setCategory}
        defaultValue={initialCategory || 'all'}
        name="category"
      >
        <SelectTrigger className="w-full sm:w-[280px] bg-white text-black rounded border border-gray-300 shadow-sm">
          <SelectValue placeholder="All Categories" />
          <ChevronDownIcon className="w-4 h-4 ml-2 text-gray-500" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectItem
              value="all"
              className="text-black hover:bg-gray-100"
            >
              All Categories
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem
                key={cat.id}
                value={cat.name}
                className="text-black hover:bg-gray-100"
              >
                {cat.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="relative w-full sm:w-[240px]">
        <SearchIcon className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none left-3 top-1/2" />
        <Input
          name="search"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 text-black bg-white border border-gray-300 rounded shadow-sm"
        />
      </div>
    </div>
  );
}
