import Link from 'next/link';

export default function ArticleActions({ prev = '#', edit = '#', remove = '#' }) {
  return (
    <div className="flex space-x-2">
      <Link
        href={prev}
        className="text-blue-500 hover:underline"
      >
        Preview
      </Link>
      <Link
        href={edit}
        className="text-yellow-500 hover:underline"
      >
        Edit
      </Link>
      <Link
        href={remove}
        className="text-red-500 hover:underline"
      >
        Delete
      </Link>
    </div>
  );
}
