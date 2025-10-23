'use client';

import { useParams } from 'next/navigation';
import NameList from '@/app/components/NameList/NameList';

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;

  if (!category) {
    return <div>Loading...</div>;
  }

  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Banner image mapping
  const bannerImages: { [key: string]: string } = {
    'elf-names': '/elves-banner.jpg',
    'dragon-names': '/dragons-banner.jpg',
    'wizard-names': '/wizard.jpg',
    'kingdom-names': '/kingdoms-banner.jpg',
    'vampire-names': '/vampires-banner.jpg',
    'robot-names': '/robots-bg.jpg',
    'god-names': '/gods-banner.jpg',
    'superhero-names': '/superheroes-banner.jpg',
  };

  const bannerStyle = {
    backgroundImage: `url('${bannerImages[category] || '/default-banner.jpg'}')`,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner Section */}
      <div 
        className="h-48 bg-cover bg-center rounded-lg mb-8 flex items-center justify-center relative"
        style={bannerStyle}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-2 text-shadow">
            {categoryName}
          </h1>

        </div>
      </div>
      
      {/* Name List */}
      <NameList category={categoryName} />
    </div>
  );
}