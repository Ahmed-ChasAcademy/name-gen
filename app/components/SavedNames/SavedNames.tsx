'use client';

import { useState, useEffect } from 'react';

export default function SavedNames() {
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const [recentlyCopied, setRecentlyCopied] = useState<string | null>(null);

  // Load saved names on component mount
  useEffect(() => {
    const loadSavedNames = () => {
      try {
        const stored = localStorage.getItem('savedNames');
        console.log('Loading from localStorage:', stored); // Debug log
        if (stored) {
          const names = JSON.parse(stored);
          setSavedNames(names);
        }
      } catch (error) {
        console.error('Error loading saved names:', error);
      }
    };

    loadSavedNames();

    // Listen for custom event when names are updated
    const handleNamesUpdated = (event: CustomEvent) => {
      console.log('Event received:', event.detail); // Debug log
      setSavedNames(event.detail.names);
    };

    // Listen for storage events (from other tabs/windows)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'savedNames') {
        loadSavedNames();
      }
    };

    // Add event listeners
    window.addEventListener('savedNamesUpdated', handleNamesUpdated as EventListener);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('savedNamesUpdated', handleNamesUpdated as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const removeName = (nameToRemove: string) => {
    const updatedNames = savedNames.filter(name => name !== nameToRemove);
    setSavedNames(updatedNames);
    localStorage.setItem('savedNames', JSON.stringify(updatedNames));
  };

  const clearAllNames = () => {
    setSavedNames([]);
    localStorage.setItem('savedNames', JSON.stringify([]));
  };

  const copyName = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setRecentlyCopied(name);
      setTimeout(() => setRecentlyCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div id="saved-names" className="bg-white border-t border-gray-200 py-6 px-4 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Saved Names ({savedNames.length})
          </h3>
          {savedNames.length > 0 && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              onClick={clearAllNames}
            >
              Clear All
            </button>
          )}
        </div>

        {savedNames.length === 0 ? (
          <div className="text-center py-4 text-gray-500 italic">
            No saved names yet. Click on names above to copy and save them here.
          </div>
        ) : (
          <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
            {savedNames.map((name, index) => (
              <li 
                key={`${name}-${index}`} 
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2 transition-colors hover:bg-gray-100 hover:border-gray-300"
              >
                <span className="font-medium text-gray-900">{name}</span>
                
                <button
                  className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded text-xs transition-colors"
                  onClick={() => copyName(name)}
                >
                  Copy
                </button>
                
                <button
                  className="text-gray-500 hover:bg-red-500 hover:text-white w-5 h-5 rounded flex items-center justify-center transition-colors"
                  onClick={() => removeName(name)}
                  title="Remove name"
                >
                  ×
                </button>

                {recentlyCopied === name && (
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded animate-pulse">
                    Copied!
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}