'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Sidebar from '@/app/components/fragments/Sidebar';
// import classNames from 'classnames';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  content: z.string().min(1, 'Content is required'),
  thumbnail: z.any().optional(),
});

const TextEditor = dynamic(() => import('@/app/components/fragments/TextEditor'), { ssr: false });

export default function CreateArticlePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please login first');
        return;
      }

      //   upload

      const imageUrl = '';

      if (data.thumbnail) {
        const formData = new FormData();
        formData.append('file', data.thumbnail);
        const uploadRes = await axios.post('https://test-fe.mysellerpintar.com/api/upload', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = uploadRes.data.url;
      }

      const payload = {
        title: data.title,
        category: data.category,
        content: data.content,
      };

      if (imageUrl) {
        payload.thumbnail = imageUrl;
      }

      await axios.post('https://test-fe.mysellerpintar.com/api/articles', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Article created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating article');
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        active="articles"
      />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Create Articles</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* <div>
            <label className="block mb-2 font-medium">Thumbnails</label>
            <input
              type="file"
              accept=".jpg,.png"
              onChange={(e) => setValue('thumbnail', e.target.files?.[0])}
            />
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
          </div> */}

          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              {...register('title')}
              className="w-full border rounded p-2"
              placeholder="Input title"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              {...register('category')}
              className="w-full border rounded p-2"
            >
              <option value="">Select category</option>
              <option value="d80e40ed-9236-49d8-b4b8-d6f1ffaae868">Management</option>
              <option value="0fa2608c-86df-48fe-89f4-6133af8cb2e0">Edu</option>
              <option value="1e8a175f-6536-4572-befa-491be3c2e3fa">Programming</option>
            </select>
            <p className="text-sm text-gray-500">
              The existing category list can be seen in the{' '}
              <a
                className="text-blue-500 underline"
                href="/category"
              >
                category
              </a>{' '}
              menu
            </p>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">Content</label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <TextEditor
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 border rounded"
            >
              Preview
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Upload
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
