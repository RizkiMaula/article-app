import axios from 'axios';
import Image from 'next/image';
import { formatDate } from '@/app/utils/stripHtml';
import NotFound from '@/app/not-found';
import Footer from '@/app/components/fragments/Footer';
import Card from '@/app/components/fragments/Card';
import Link from 'next/link.js';
import Header from '@/app/components/fragments/Header';
import LogoWhite from '@/app/components/fragments/LogoWhite';
import Logo from '@/app/components/fragments/Logo';

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;

    // Fetch data artikel
    const response = await axios.get(`https://test-fe.mysellerpintar.com/api/articles/${id}`);
    const article = response.data;

    // Return metadata
    return {
      title: `${article.title} | Blog Genzet`,
      description: article.content.substring(0, 160),
      openGraph: {
        images: [
          {
            url: article.imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
    };
  } catch (error) {
    // Fallback metadata jika error
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found',
    };
  }
}

export default async function ArticleDetail({ params }) {
  let article = null;
  let otherArticles = [];

  try {
    const { id } = await params;
    // Fetch artikel utama dan artikel lainnya secara paralel
    const [articleResponse, otherResponse] = await Promise.all([axios.get(`https://test-fe.mysellerpintar.com/api/articles/${id}`), axios.get(`https://test-fe.mysellerpintar.com/api/articles?limit=3`)]);

    article = articleResponse.data;
    otherArticles = otherResponse.data.data; // Perhatikan struktur respons API
  } catch (error) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        textColor="text-black"
        logo={<Logo />}
      />

      {/* Konten Artikel */}
      <main className="max-w-4xl mx-auto p-6">
        <p className="text-sm text-gray-500 mb-2">
          {formatDate(article.createdAt)} • Created by {article.user.username}
        </p>
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        <Image
          width={1500}
          height={1500}
          src={article.imageUrl}
          alt={article.title}
          className="rounded-xl w-full mb-6"
        />

        <div dangerouslySetInnerHTML={{ __html: article.content }} />

        {/* Other Articles */}
        <h2 className="text-xl font-bold mb-4">Other articles</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {otherArticles.map((otherArticle) => (
            <Link
              key={otherArticle.id}
              href={`/articles/${otherArticle.id}`}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <Card
                title={otherArticle.title}
                category={otherArticle.category?.name}
                keyId={otherArticle.id}
                image={otherArticle.imageUrl}
                content={otherArticle.content}
                createdAt={otherArticle.createdAt}
              />
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
