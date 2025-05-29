'use server';

import { Button } from '@/components/ui/button';
import Footer from '../components/fragments/Footer.jsx';
import axios from 'axios';
import { stripHTML, formatDate } from '../utils/stripHTML.js';

export default async function Home() {
  const response = await axios.get('https://test-fe.mysellerpintar.com/api/articles');
  const articles = response?.data;

  return (
    <div className="h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col justify-between gap-[32px] row-start-2 items-center sm:items-start border-2 border-black">
        <div className="flex w-[80%] border-2 border-black">
          <h1 className="text-2xl font-bold">
            Showing: {articles?.limit} of {articles?.total}
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4 border-5 w-[80%] m-auto">
          {articles?.data?.map((article) => (
            <div
              key={article.id}
              className="flex flex-col gap-3 p-4 border-2 border-black"
            >
              <img
                className="w-[100%] h-[50%] rounded"
                src={article.imageUrl}
                alt={article.title}
              />
              <p>{formatDate(article.createdAt)}</p>
              <h2 className="text-lg font-bold text-justify">{article.title}</h2>
              <p className="line-clamp-3">{stripHTML(article.content)}</p>
              <div className="flex gap-3">
                <p className="px-2 py-1 text-sm text-blue-900 bg-blue-200 rounded-2xl">{article.category.name}</p>
              </div>
            </div>
          ))}
        </div>
        <Button>ini button</Button>
      </main>
      <Footer />
    </div>
  );
}
