'use server';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input.jsx';
import Footer from '../components/fragments/Footer.jsx';
import axios from 'axios';
import background from '../../assets/background.jpg';
import Image from 'next/image';
import Card from '../components/fragments/Card.jsx';
import { Paginate } from '../components/fragments/Paginate.jsx';
import { PageItem } from '../components/fragments/PageItem.jsx';
import Link from 'next/link.js';
import Header from '../components/fragments/Header.jsx';
import { getPageNumbers } from '../utils/stripHtml.js';

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

    const pageNumbers = getPageNumbers({ page, totalPages });

    return (
      <>
        <div className="fixed top-0 w-full z-50">
          <Header />
        </div>

        <div className="relative w-full h-[30rem] overflow-hidden pt-16">
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
            <div className="absolute inset-0 bg-[#2563EBDB] bg-opacity-30 mix-blend-multiply pointer-events-none"></div>
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
              {/* card */}
              {articles?.data?.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  passHref
                >
                  <Card
                    key={article.id}
                    title={article.title}
                    category={article.category.name}
                    keyId={article.id}
                    image={article.imageUrl}
                    content={article.content}
                    createdAt={article.createdAt}
                  />
                </Link>
              ))}
            </div>
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
