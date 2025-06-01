import axios from 'axios';
import DataTable from '@/app/components/fragments/DataTable';
import CategoryActions from '@/app/components/fragments/CategoryActions';

async function getCategories() {
  try {
    const response = await axios.get('https://test-fe.mysellerpintar.com/api/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  const columns = [
    { key: 'name', title: 'Name' },
    {
      key: 'createdAt',
      title: 'Created At',
      render: (item) =>
        new Date(item.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    },
    {
      key: 'actions',
      title: 'Action',
      render: () => <CategoryActions />,
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <DataTable
        columns={columns}
        data={categories}
      />
    </div>
  );
}
