'use client';

import React, { useState, useCallback } from 'react';
import styles from './page.module.css';

export default function GeneratePage() {
    // State Management
    const [criteria, setCriteria] = useState('');
    const [count, setCount] = useState(5);
    const [wordCount, setWordCount] = useState<'any' | 1 | 2 | 3>('any');
    const [nameStyle, setNameStyle] = useState('any');
    const [customStyle, setCustomStyle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<string[]>([]);
    const [copiedName, setCopiedName] = useState<string | null>(null);

    // Utility Functions
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

    const generateNames = useCallback(async () => {
        if (!criteria.trim()) {
            setError("Please enter criteria for the names you want to generate.");
            return;
        }

        setError(null);
        setResults([]);
        setIsLoading(true);

        try {
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
        <div className={styles.container}>
            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        AI Fantasy Name Generator
                    </h1>
                    <p className={styles.subtitle}>
                        Create unique names with artificial intelligence
                    </p>
                </div>

                {/* Input Card */}
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        Name Criteria
                    </h2>

                    <div>
                        {/* Criteria Input */}
                        <div className={styles.formGroup}>
                            <label htmlFor="criteria" className={styles.label}>
                                Describe the type of name you need:
                            </label>
                            <textarea
                                id="criteria"
                                rows={3}
                                className={styles.textarea}
                                placeholder="e.g., Mysterious elven names for a forest guardian, Strong dwarven names for a blacksmith, Futuristic robot names for a spaceship AI..."
                                value={criteria}
                                onChange={(e) => setCriteria(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Settings Grid */}
                        <div className={styles.settingsGrid}>
                            {/* Word Count */}
                            <div>
                                <label htmlFor="wordCount" className={styles.label}>
                                    Words per Name
                                </label>
                                <select
                                    id="wordCount"
                                    className={styles.select}
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
                                <label htmlFor="count" className={styles.label}>
                                    Number of Names
                                </label>
                                <input
                                    type="number"
                                    id="count"
                                    value={count}
                                    min="1"
                                    max="10"
                                    className={styles.input}
                                    onChange={(e) => setCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Name Style */}
                            <div>
                                <label htmlFor="nameStyle" className={styles.label}>
                                    Name Style
                                </label>
                                <select
                                    id="nameStyle"
                                    className={styles.select}
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
                            <div className={styles.formGroup}>
                                <label htmlFor="customStyle" className={styles.label}>
                                    Custom Style Description
                                </label>
                                <input
                                    type="text"
                                    id="customStyle"
                                    className={styles.input}
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
                            className={styles.button}
                        >
                            {isLoading ? (
                                <>
                                    <div className={styles.spinner}></div>
                                    Generating Names...
                                </>
                            ) : (
                                'Generate Names'
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Card */}
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>
                        Generated Names
                    </h2>

                    {/* Error Display */}
                    {error && (
                        <div className={styles.error}>
                            <strong>Error: </strong>
                            {error}
                        </div>
                    )}

                    {/* Results Grid */}
                    {results.length > 0 && (
                        <div className={styles.resultsGrid}>
                            {results.map((name, index) => (
                                <div
                                    key={index}
                                    className={styles.resultCard}
                                    onClick={() => handleCopy(name)}
                                >
                                    <div className={styles.resultName}>
                                        {name}
                                    </div>
                                    <div className={styles.copyIcon}>
                                        {copiedName === name ? '✓' : '📋'}
                                    </div>
                                    {copiedName === name && (
                                        <div className={styles.copiedBadge}>
                                            Copied!
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && !error && results.length === 0 && (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>✨</div>
                            <p>
                                {criteria.trim() 
                                    ? "Ready to generate some amazing names!" 
                                    : "Enter your criteria above to generate unique fantasy names"
                                }
                            </p>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className={styles.loadingState}>
                            <div className={styles.loadingSpinner}></div>
                            <p>AI is creating unique names for you...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}