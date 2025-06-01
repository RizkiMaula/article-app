'use server';

import AuthGuard from '@/app/components/fragments/AuthGuard';
import DataTable from '@/app/components/fragments/DataTable';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';

export default async function ArticlesPage() {
  try {
    const response = await axios.get(`https://test-fe.mysellerpintar.com/api/articles`);
    const category = await axios.get('https://test-fe.mysellerpintar.com/api/categories?limit=100');

    // Akses data langsung dari response axios
    const articles = response.data;
    const categories = category.data;

    console.log(`articles: ${articles?.data}`);

    // const totalPages = Math.ceil(articles.total / limit);

    return (
      <AuthGuard requiredRoles={['Admin']}>
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Articles: {articles?.data?.length ?? 0}</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">+ Add Articles</button>
          </div>
          {/* Filter & Search */}
          <div className="flex items-center gap-4 mb-4">
            {/* Category Filter */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.map((cat) =>
                  cat?.id ? (
                    <SelectItem
                      key={cat.id}
                      value={String(cat.id)}
                    >
                      {cat.name}
                    </SelectItem>
                  ) : null
                )}
              </SelectContent>
            </Select>

            {/* Search Input */}
            <Input
              type="text"
              placeholder="Search by title"
              className="w-full max-w-sm"
            />
          </div>
          {/* Table */}
          <Table className={'mt-4 text-center'}>
            <TableHeader>
              <TableRow>
                <TableHead className={'mt-4 text-center'}>Thumbnails</TableHead>
                <TableHead className={'mt-4 text-center'}>Title</TableHead>
                <TableHead className={'mt-4 text-center'}>Category</TableHead>
                <TableHead className={'mt-4 text-center'}>CreatedAt</TableHead>
                <TableHead className={'mt-4 text-center'}>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles?.data?.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      width={100}
                      height={0}
                      style={{ height: 'auto' }}
                    />
                  </TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.category.name}</TableCell>
                  <TableCell>{article.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <a href={`/admin/articles/${article.id}`}>Edit</a>
                      <a href={`/admin/articles/${article.id}`}>Preview</a>
                      <a href={`/admin/articles/${article.id}`}>Delete</a>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          ;{/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button className="text-sm px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100">&lt; Previous</button>
            <div className="flex gap-2">
              <button className="text-sm px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100">1</button>
              <button className="text-sm px-3 py-1 rounded border border-gray-300 bg-blue-600 text-white">2</button>
              <span className="text-sm px-3 py-1 text-gray-500">...</span>
              <button className="text-sm px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100">Next &gt;</button>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <AuthGuard requiredRoles={['Admin']}>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-red-500">Failed to load articles. Please try again later.</p>
        </div>
      </AuthGuard>
    );
  }
}
