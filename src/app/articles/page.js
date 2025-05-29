'use server';

import { Button } from '@/components/ui/button';
import Footer from '../components/fragments/Footer.jsx';
import axios from 'axios';
import Link from 'next/link.js';

export default async function Home() {
  const response = await axios.get('https://test-fe.mysellerpintar.com/api/articles');
  const articles = response.data;

  const content = articles?.data?.map((article) => article.content).join(' ');

  console.log(`articles: ${articles}`);

  console.log(`content: ${content}`);

  return (
    <div className=" min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start border-2 border-black">
        <h1>ini halaman Article</h1>
        <div className="grid grid-cols-3 gap-4 border-2 border-gray w-[80%] m-auto">
          {articles?.data?.map((article) => (
            <div
              key={article.id}
              className="flex flex-col gap-4 border-2 border-black"
            >
              <img
                className="w-[100%] h-[50%] rounded"
                src={article.imageUrl}
                alt={article.title}
              />
              <p>{article.createdAt}</p>
              <h2 className="font-bold">{article.title}</h2>
              {/* <p
                className="line-clamp-3"
                dangerouslySetInnerHTML={{ __html: article.content }}
              /> */}

              <p className="line-clamp-3">{content}</p>
              <div className="flex gap-3">
                <p>{article.category.name}</p>
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
