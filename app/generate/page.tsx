// app/generate/page.tsx
'use client';

import React, { useState, useCallback } from 'react';

export default function GeneratePage() {
    // --- State Management ---
    const [criteria, setCriteria] = useState('');
    const [count, setCount] = useState(5);
    const [wordCount, setWordCount] = useState<'any' | 1 | 2 | 3>('any');
    const [nameStyle, setNameStyle] = useState('any');
    const [customStyle, setCustomStyle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<string[]>([]);
    const [copiedName, setCopiedName] = useState<string | null>(null);

    // --- Utility Functions ---

    /**
     * Handles copying a name to the clipboard
     */
    const handleCopy = async (name: string) => {
        try {
            await navigator.clipboard.writeText(name);
            setCopiedName(name);
            setTimeout(() => setCopiedName(null), 1500);
        } catch (err) {
            console.error('Failed to copy text', err);
            // Fallback for older browsers
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = name;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);
            setCopiedName(name);
            setTimeout(() => setCopiedName(null), 1500);
        }
    };

    /**
     * Handles the API call to generate names
     */
    const generateNames = useCallback(async () => {
        if (!criteria.trim()) {
            setError("Please enter criteria for the names you want to generate.");
            return;
        }

        // Reset UI state
        setError(null);
        setResults([]);
        setIsLoading(true);

        try {
            // Call your API route
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    criteria: criteria.trim(),
                    count,
                    wordCount,
                    nameStyle: nameStyle === 'custom' ? customStyle.trim() : nameStyle,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to generate names: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.names && Array.isArray(data.names)) {
                setResults(data.names);
            } else {
                throw new Error('Invalid response format from server');
            }

        } catch (err: any) {
            console.error('Generation Error:', err);
            setError(err.message || 'Failed to generate names. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [criteria, count, wordCount, nameStyle, customStyle]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        AI Fantasy Name Generator
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Create unique names with artificial intelligence
                    </p>
                </div>

                {/* Input Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Name Criteria
                    </h2>

                    <div className="space-y-6">
                        {/* Criteria Input */}
                        <div>
                            <label htmlFor="criteria" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Describe the type of name you need:
                            </label>
                            <textarea
                                id="criteria"
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                                placeholder="e.g., Mysterious elven names for a forest guardian, Strong dwarven names for a blacksmith, Futuristic robot names for a spaceship AI..."
                                value={criteria}
                                onChange={(e) => setCriteria(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Settings Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Word Count */}
                            <div>
                                <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Words per Name
                                </label>
                                <select
                                    id="wordCount"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    value={wordCount}
                                    onChange={(e) => setWordCount(e.target.value as 'any' | 1 | 2 | 3)}
                                    disabled={isLoading}
                                >
                                    <option value="any">Any number</option>
                                    <option value={1}>1 Word</option>
                                    <option value={2}>2 Words</option>
                                    <option value={3}>3 Words</option>
                                </select>
                            </div>

                            {/* Name Count */}
                            <div>
                                <label htmlFor="count" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Number of Names
                                </label>
                                <input
                                    type="number"
                                    id="count"
                                    value={count}
                                    min="1"
                                    max="10"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    onChange={(e) => setCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Name Style */}
                            <div>
                                <label htmlFor="nameStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Name Style
                                </label>
                                <select
                                    id="nameStyle"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    value={nameStyle}
                                    onChange={(e) => setNameStyle(e.target.value)}
                                    disabled={isLoading}
                                >
                                    <option value="any">Any Style</option>
                                    <option value="fantasy">Fantasy</option>
                                    <option value="medieval">Medieval</option>
                                    <option value="futuristic">Futuristic</option>
                                    <option value="mythological">Mythological</option>
                                    <option value="dark">Dark/Gothic</option>
                                    <option value="whimsical">Whimsical</option>
                                    <option value="custom">Custom Style...</option>
                                </select>
                            </div>
                        </div>

                        {/* Custom Style Input */}
                        {nameStyle === 'custom' && (
                            <div>
                                <label htmlFor="customStyle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Custom Style Description
                                </label>
                                <input
                                    type="text"
                                    id="customStyle"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                    placeholder="e.g., names that sound ancient and mysterious"
                                    value={customStyle}
                                    onChange={(e) => setCustomStyle(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        {/* Generate Button */}
                        <button
                            onClick={generateNames}
                            disabled={isLoading || !criteria.trim()}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Generating Names...
                                </>
                            ) : (
                                'Generate Names'
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Generated Names
                    </h2>

                    {/* Error Display */}
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
                            <strong className="font-bold">Error: </strong>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Results Grid */}
                    {results.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {results.map((name, index) => (
                                <div
                                    key={index}
                                    className="relative group"
                                >
                                    <div
                                        onClick={() => handleCopy(name)}
                                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-200 dark:hover:bg-blue-800 hover:shadow-md"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">{name}</span>
                                            <span className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {copiedName === name ? '✅' : '📋'}
                                            </span>
                                        </div>
                                    </div>
                                    {copiedName === name && (
                                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-pulse">
                                            Copied!
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && !error && results.length === 0 && (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <div className="text-6xl mb-4">✨</div>
                            <p className="text-lg">
                                {criteria.trim() 
                                    ? "Ready to generate some amazing names!" 
                                    : "Enter your criteria above to generate unique fantasy names"
                                }
                            </p>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400">AI is creating unique names for you...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}