// components/NameList.tsx
'use client';

import { useState, useEffect } from 'react';

interface Name {
  _id: string;
  name: string;
  meaning?: string;
  origin?: string;
  gender?: 'male' | 'female' | 'neutral';
  race?: string;
}

interface NameListProps {
  category: string;
}

export default function NameList({ category }: NameListProps) {
  const [names, setNames] = useState<Name[]>([]);
  const [filteredNames, setFilteredNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female' | 'neutral'>('all');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const namesPerPage = 10;

  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        // Mock data - replace with your MongoDB API call
        const mockNames: Name[] = [
          { _id: '1', name: 'Aelar', meaning: 'Star dancer', origin: 'Elven', gender: 'male' },
          { _id: '2', name: 'Lyra', meaning: 'Silver song', origin: 'Elven', gender: 'female' },
          { _id: '3', name: 'Thorne', meaning: 'Protector', origin: 'Human', gender: 'neutral' },
          { _id: '4', name: 'Grommash', meaning: 'Mighty axe', origin: 'Orc', gender: 'male' },
          { _id: '5', name: 'Sylvanas', meaning: 'Forest spirit', origin: 'Elven', gender: 'female' },
          { _id: '6', name: 'Balin', meaning: 'Mighty soldier', origin: 'Dwarven', gender: 'male' },
          { _id: '7', name: 'Morgana', meaning: 'Sea circle', origin: 'Human', gender: 'female' },
          { _id: '8', name: 'Riven', meaning: 'Broken path', origin: 'Mystic', gender: 'neutral' },
          { _id: '9', name: 'Kael', meaning: 'Fire spirit', origin: 'Elven', gender: 'male' },
          { _id: '10', name: 'Isolde', meaning: 'Ice ruler', origin: 'Human', gender: 'female' },
          { _id: '11', name: 'Zephyr', meaning: 'West wind', origin: 'Elemental', gender: 'neutral' },
          { _id: '12', name: 'Draven', meaning: 'Hunter', origin: 'Human', gender: 'male' },
        ];
        
        // Filter by category (you'll replace this with actual API call)
        const categoryNames = mockNames.filter(name => 
          name.origin?.toLowerCase().includes(category.toLowerCase().replace(' names', '')) || 
          name.origin === 'Mystic'
        );
        
        setNames(categoryNames);
        setFilteredNames(categoryNames);
      } catch (error) {
        console.error('Error fetching names:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [category]);

  // Filter names by gender
  useEffect(() => {
    if (genderFilter === 'all') {
      setFilteredNames(names);
    } else {
      setFilteredNames(names.filter(name => name.gender === genderFilter));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [genderFilter, names]);

  // Copy name to clipboard
  const copyToClipboard = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredNames.length / namesPerPage);
  const startIndex = (currentPage - 1) * namesPerPage;
  const currentNames = filteredNames.slice(startIndex, startIndex + namesPerPage);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-20 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gender Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setGenderFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            genderFilter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Names
        </button>
        <button
          onClick={() => setGenderFilter('male')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            genderFilter === 'male'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          ♂ Male
        </button>
        <button
          onClick={() => setGenderFilter('female')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            genderFilter === 'female'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          ♀ Female
        </button>
        <button
          onClick={() => setGenderFilter('neutral')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            genderFilter === 'neutral'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          ⚧ Neutral
        </button>
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentNames.map((name) => (
          <div
            key={name._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {name.name}
                </h3>
                <span className={`
                  text-xs font-medium px-2 py-1 rounded-full
                  ${name.gender === 'male' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
                  ${name.gender === 'female' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' : ''}
                  ${name.gender === 'neutral' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                `}>
                  {name.gender === 'male' ? '♂' : name.gender === 'female' ? '♀' : '⚧'}
                </span>
              </div>
              
              <button
                onClick={() => copyToClipboard(name.name)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg"
                title="Copy name"
              >
                {copiedName === name.name ? '✅' : '📋'}
              </button>
            </div>

            {name.meaning && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {name.meaning}
              </p>
            )}
            
            {name.origin && (
              <p className="text-gray-500 dark:text-gray-500 text-xs">
                Origin: {name.origin}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← Previous
          </button>
          
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Next →
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Showing {currentNames.length} of {filteredNames.length} names
        {genderFilter !== 'all' && ` (${genderFilter} only)`}
      </div>
    </div>
  );
}