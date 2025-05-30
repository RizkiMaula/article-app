import { formatDate, stripHTML } from '../../utils/stripHTML.js';

export default function Card({ title, category, keyId, image, content, createdAt }) {
  return (
    <div
      key={keyId}
      className="flex flex-col gap-3 p-4 transition-shadow rounded-lg hover:shadow-md"
    >
      {image ? (
        <img
          className="object-cover w-full h-48 rounded-md"
          src={image}
          alt={title}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-48 bg-gray-200 border-2 border-dashed rounded-xl">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
      <h2 className="text-lg font-bold text-justify line-clamp-2">{title}</h2>
      <p className="text-gray-700 line-clamp-3">{stripHTML(content)}</p>
      <div className="flex gap-3 mt-auto">
        <span className="px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">{category}</span>
      </div>
    </div>
  );
}
