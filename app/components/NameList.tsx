// components/NameList.tsx
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

export default function NameList({ category }: NameListProps) {
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedName, setCopiedName] = useState<string | null>(null);

  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/names?category=${encodeURIComponent(category)}`);
        const data = await response.json();
        setNames(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [category]);

  const copyToClipboard = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {names.map((name) => (
          <div
            key={name._id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative group"
          >
            {/* Copy Button */}
            <button
              onClick={() => copyToClipboard(name.name)}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
              title="Copy name"
            >
              {copiedName === name.name ? '✅' : '📋'}
            </button>

            {/* Name */}
            <h3 className="font-bold text-lg text-gray-900 pr-8">
              {name.name}
            </h3>

            {/* Meaning */}
            {name.meaning && (
              <p className="text-gray-600 text-sm mt-1">
                {name.meaning}
              </p>
            )}

            {/* Origin & Gender */}
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              {name.origin && (
                <span>Origin: {name.origin}</span>
              )}
              {name.gender && (
                <span className="capitalize">{name.gender}</span>
              )}
            </div>

            {/* Copied Feedback */}
            {copiedName === name.name && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                Copied!
              </div>
            )}
          </div>
        ))}
      </div>

      {names.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No names found for this category.
        </div>
      )}
    </div>
  );
}