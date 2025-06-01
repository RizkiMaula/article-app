export default function CategoryActions() {
  return (
    <div className="flex space-x-2">
      <button className="text-blue-500 hover:underline">Preview</button>
      <button className="text-yellow-500 hover:underline">Edit</button>
      <button className="text-red-500 hover:underline">Delete</button>
    </div>
  );
}
