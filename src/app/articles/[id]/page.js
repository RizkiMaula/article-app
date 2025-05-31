import axios from 'axios';
import Image from 'next/image';
import { formatDate } from '@/app/utils/stripHtml';
import NotFound from '@/app/not-found';

export async function generateMetadata({ params }) {
  try {
    // Akses params.id secara langsung - tidak perlu await khusus
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

  try {
    const { id } = await params;
    const response = await axios.get(`https://test-fe.mysellerpintar.com/api/articles/${id}`);
    article = response.data;
  } catch (error) {
    // Tampilkan halaman 404 jika error
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative bg-blue-800 h-96">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        <div className="container relative z-10 flex flex-col justify-end h-full px-4 pb-12 mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-blue-800 bg-white rounded-full">{article.category.name}</span>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{article.title}</h1>
            <div className="flex items-center text-white">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 mr-3 bg-gray-200 rounded-full">
                  <span className="text-xs text-gray-500">U</span>
                </div>
                <span>Admin</span>
              </div>
              <span className="mx-3">•</span>
              <span>{formatDate(article.createdAt)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Konten Artikel */}
      <main className="container max-w-3xl px-4 py-16 mx-auto">
        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 mx-auto text-center">
          <p>© 2025 Blog Genzet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
