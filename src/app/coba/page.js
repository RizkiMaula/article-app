import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Footer from '../components/fragments/Footer.jsx';
import { stripHTML, formatDate } from '../utils/stripHTML.js';

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
    <div className="min-h-screen pb-20 flex flex-col gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center">
        <h1 className="w-[80%] font-bold mb-6">
          Showing: {articles?.data?.length} of {articles?.total} articles
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%]">
          {articles?.data?.map((article) => (
            <div
              key={article.id}
              className="flex flex-col gap-3 p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-md"
            >
              {article.imageUrl ? (
                <img
                  className="object-cover w-full h-48 rounded-md"
                  src={article.imageUrl}
                  alt={article.title}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-48 bg-gray-200 border-2 border-dashed rounded-xl">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <p className="text-sm text-gray-500">{formatDate(article.createdAt)}</p>
              <h2 className="text-lg font-bold text-justify line-clamp-2">{article.title}</h2>
              <p className="text-gray-700 line-clamp-3">{stripHTML(article.content)}</p>
              <div className="flex gap-3 mt-auto">
                <span className="px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">{article.category.name}</span>
                <span className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">@{article.user.username}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${Math.max(1, page - 1)}`}
                aria-disabled={page <= 1}
                className={page <= 1 ? 'opacity-50 pointer-events-none' : ''}
              />
            </PaginationItem>

            {pageNumbers.map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href={`?page=${pageNum}`}
                  isActive={pageNum === page}
                  className={pageNum === page ? 'bg-blue-500 text-white' : ''}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={`?page=${Math.min(totalPages, page + 1)}`}
                aria-disabled={page >= totalPages}
                className={page >= totalPages ? 'opacity-50 pointer-events-none' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>

      <Footer />
    </div>
  );
}
