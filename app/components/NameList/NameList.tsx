'use client';

import { useEffect, useState } from 'react';

interface Name {
  _id: string;
  name: string;
  meaning?: string;
  origin?: string;
  gender?: string;
}

interface NameListProps {
  category: string;
}

type GenderFilter = 'all' | 'male' | 'female' | 'unisex';

export default function NameList({ category }: NameListProps) {
  const [allNames, setAllNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const namesPerPage = 20;

  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/names?category=${encodeURIComponent(category)}`);
        const data = await response.json();
        setAllNames(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [category]);

  // Filter names by gender
  const filteredNames = allNames.filter(name => {
    if (genderFilter === 'all') return true;
    if (genderFilter === 'unisex') return !name.gender || name.gender === 'unisex';
    return name.gender === genderFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNames.length / namesPerPage);
  const startIndex = (currentPage - 1) * namesPerPage;
  const currentNames = filteredNames.slice(startIndex, startIndex + namesPerPage);

  const copyToClipboard = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
      
      // TEST: Simple localStorage approach
      console.log('Copying name:', name); // Check if this logs
      
      // Get current saved names
      const savedNames = JSON.parse(localStorage.getItem('savedNames') || '[]');
      
      // Add new name if not already there
      if (!savedNames.includes(name)) {
        const updatedNames = [name, ...savedNames];
        localStorage.setItem('savedNames', JSON.stringify(updatedNames));
        console.log('Saved to localStorage:', updatedNames); // Check if this logs
        
        // Dispatch event to notify SavedNames component
        window.dispatchEvent(new CustomEvent('savedNamesUpdated', {
          detail: { names: updatedNames }
        }));
      }
      
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = name;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGenderFilter = (gender: GenderFilter) => {
    setGenderFilter(gender);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-14 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Gender Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-4">
        {(['all', 'male', 'female', 'unisex'] as GenderFilter[]).map((gender) => (
          <button
            key={gender}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              genderFilter === gender
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleGenderFilter(gender)}
          >
            {gender === 'all' ? 'All Names' : gender.charAt(0).toUpperCase() + gender.slice(1)}
          </button>
        ))}
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {currentNames.map((name) => (
          <div
            key={name._id}
            className="bg-white border border-gray-200 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 text-center relative"
            onClick={() => copyToClipboard(name.name)}
          >
            <div className="font-medium text-gray-900">
              {name.name}
            </div>
            {copiedName === name.name && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg animate-pulse">
                Copied!
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredNames.length > namesPerPage && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredNames.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No names found for this category and gender filter.
        </div>
      )}
    </div>
  );
}