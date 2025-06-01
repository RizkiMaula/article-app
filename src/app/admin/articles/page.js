'use server';

import AuthGuard from '@/app/components/fragments/AuthGuard';
import DataTable from '@/app/components/fragments/DataTable';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { formatDateTime } from '@/app/utils/stripHtml';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ArticleActions from '@/app/components/fragments/ArticleActions';
import { Paginate } from '@/app/components/fragments/Paginate.jsx';
import { PageItem } from '@/app/components/fragments/PageItem.jsx';
import { getPageNumbers } from '@/app/utils/stripHtml';

export default async function ArticlesPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;

  try {
    const response = await axios.get(`https://test-fe.mysellerpintar.com/api/articles?page=${page}&limit=${limit}`);
    const category = await axios.get('https://test-fe.mysellerpintar.com/api/categories?limit=100');

    // Akses data langsung dari response axios
    const articles = response.data;
    const categories = category.data;

    const totalPages = Math.ceil(articles.total / limit);

    const pageNumbers = getPageNumbers({ page, totalPages });

    return (
      <AuthGuard requiredRoles={['Admin']}>
        <div className="p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Articles: {articles?.data?.length ?? 0}</h2>
            <Link href="/admin/articles/add">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">+ Add Articles</Button>
            </Link>
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
                  <TableCell>{formatDateTime(article.createdAt)}</TableCell>
                  <TableCell>
                    <ArticleActions article={article} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <Paginate
            prevLink={`?page=${Math.max(1, page - 1)}`}
            nextLink={`?page=${Math.min(totalPages, page + 1)}`}
            pageNumbers={
              <>
                {pageNumbers.map((pageNum) => (
                  <PageItem
                    key={pageNum}
                    currentPage={pageNum}
                    activePage={page}
                  />
                ))}
              </>
            }
            page={page}
            totalPages={totalPages}
          />
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
