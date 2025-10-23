// app/names/[category]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import NameList from '@/app/components/NameList';

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;

  if (!category) {
    return <div>Loading...</div>;
  }

  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {categoryName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Discover the perfect {categoryName.toLowerCase()} for your fantasy world.
        </p>
      </div>
      
      <NameList category={categoryName} />
    </div>
  );
}