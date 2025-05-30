'use server';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input.jsx';
import Footer from '../components/fragments/Footer.jsx';
import axios from 'axios';
import { stripHTML, formatDate } from '../utils/stripHTML.js';
import background from '../../assets/background.jpg';
import logo from '../../assets/Logo.png';
import Image from 'next/image';

export default async function Home({ searchParams }) {
  // ambil parameter url
  const page = Number(searchParams.page) || 1;
  const limit = 9;

  try {
    // fetch data dengan parameter pagination menggunakan axios
    const response = await axios.get(`https://test-fe.mysellerpintar.com/api/articles?page=${page}&limit=${limit}`);
    const category = await axios.get('https://test-fe.mysellerpintar.com/api/categories?limit=100');

    // Akses data langsung dari response axios
    const articles = response.data;
    const categories = category.data;

    // hitung total halaman
    const totalPages = Math.ceil(articles.total / limit);

    // fungsi untuk menghasilkan nomor halaman yang ditampilkan
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
      <>
        <div className="relative w-full h-[30rem] overflow-hidden">
          {/* Bar yang ada di atas */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between h-14">
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
          </div>

          {/* Background image dengan overlay */}
          <div className="absolute inset-0">
            <Image
              src={background}
              alt="Background"
              layout="fill"
              objectFit="cover"
              quality={90}
              placeholder="blur"
              className="opacity-100"
            />
            {/* Overlay biru muda */}
            <div className="absolute inset-0 bg-[#2563EBDB] bg-opacity-30 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3 px-4 text-center text-white">
            <h5 className="mb-2 text-xl font-semibold">Blog genzet</h5>
            <h1 className="max-w-3xl mb-4 text-4xl font-bold md:text-5xl">The Journal: Design Resource, Interviews, and Industry News</h1>
            <h2 className="text-xl md:text-2xl opacity-90">Your daily dose of design insights!</h2>
            <div className="z-10 flex flex-col w-[34rem] max-w-4xl gap-2 p-1 bg-blue-600 rounded sm:flex-row">
              {/* Select Category */}
              <Select>
                <SelectTrigger className="w-full sm:w-[280px] bg-white text-black rounded border border-gray-300 shadow-sm">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {categories?.data?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.name}
                        className="hover:bg-gray-100"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Search Input */}
              <div className="relative w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  placeholder="Search..."
                  className="w-full pl-10 text-black bg-white border border-gray-300 rounded shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-screen pb-20 flex flex-col gap-16 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col items-center justify-center">
            <h1 className="w-[80%] font-bold mb-6">
              Showing: {articles?.data?.length} of {articles?.total} articles
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[80%]">
              {articles?.data?.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col gap-3 p-4 transition-shadow rounded-lg hover:shadow-md"
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
                  </div>
                </div>
              ))}
            </div>
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
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Failed to load articles. Please try again later.</p>
      </div>
    );
  }
}
