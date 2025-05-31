import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Footer from '../components/fragments/Footer.jsx';
import { stripHTML, formatDate } from '../utils/stripHTML.js';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default async function Home({ searchParams }) {
  // Ambil parameter halaman dari URL
  const page = Number(searchParams.page) || 1;
  const limit = 10;

  // Fetch data dengan parameter pagination
  const response = await fetch(`https://test-fe.mysellerpintar.com/api/articles?page=${page}&limit=${limit}`);

  if (!response.ok) throw new Error('Failed to fetch articles');
  const articles = await response.json();

  // Hitung total halaman
  const totalPages = Math.ceil(articles.total / limit);

  // Fungsi untuk menghasilkan nomor halaman yang ditampilkan
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Form>
      <form className="space-y-8">
        <FormField
          control
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
