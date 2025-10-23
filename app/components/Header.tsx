// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';

// Fewer main categories but packed with subcategories
const mainCategories = {
  'Fantasy': {
    'Races & Beings': [
      'Elf Names', 'Dwarf Names', 'Orc Names', 'Fairy Names', 'Angel Names', 
      'Demon Names', 'Vampire Names', 'Werewolf Names', 'Dragon Names',
      'Centaur Names', 'Minotaur Names', 'Mermaid Names', 'Siren Names',
      'Nymph Names', 'Satyr Names', 'Dryad Names', 'Naga Names'
    ],
    'Creatures & Monsters': [
      'Griffin Names', 'Phoenix Names', 'Unicorn Names', 'Pegasus Names',
      'Sphinx Names', 'Chimera Names', 'Basilisk Names', 'Kraken Names',
      'Hydra Names', 'Gorgon Names', 'Cerberus Names', 'Leviathan Names',
      'Behemoth Names', 'Wyvern Names', 'Drake Names', 'Elemental Names'
    ],
    'Magic & Items': [
      'Spell Names', 'Magic Item Names', 'Potion Names', 'Artifact Names',
      'Weapon Names', 'Sword Names', 'Staff Names', 'Wand Names',
      'Armor Names', 'Relic Names', 'Crystal Names', 'Rune Names'
    ]
  },
  'Characters': {
    'Heroes & Warriors': [
      'Warrior Names', 'Paladin Names', 'Knight Names', 'Ranger Names',
      'Barbarian Names', 'Samurai Names', 'Ninja Names', 'Hero Names'
    ],
    'Magic Users': [
      'Wizard Names', 'Sorcerer Names', 'Warlock Names', 'Necromancer Names',
      'Druid Names', 'Cleric Names', 'Bard Names', 'Monk Names'
    ],
    'Royalty & Nobility': [
      'King Names', 'Queen Names', 'Prince Names', 'Princess Names',
      'Lord Names', 'Lady Names', 'Baron Names', 'Duke Names',
      'Emperor Names', 'Empress Names', 'Royal Family Names'
    ],
    'Villains & Dark': [
      'Dark Lord Names', 'Evil Sorcerer Names', 'Necromancer Names',
      'Cult Leader Names', 'Tyrant Names', 'Betrayer Names', 'Anti-Hero Names',
      'Fallen Hero Names', 'Corrupted Names', 'Shadow Names'
    ]
  },
  'Worlds': {
    'Places & Locations': [
      'Kingdom Names', 'Empire Names', 'City Names', 'Town Names',
      'Village Names', 'Castle Names', 'Fortress Names', 'Temple Names',
      'Tavern Names', 'Inn Names', 'Shop Names', 'Dungeon Names',
      'Forest Names', 'Mountain Names', 'River Names', 'Island Names'
    ],
    'Animals & Pets': [
      'Dragon Pets', 'Wolf Names', 'Cat Names', 'Bird Names',
      'Horse Names', 'Owl Names', 'Raven Names', 'Fox Names',
      'Bear Names', 'Tiger Names', 'Lion Names', 'Eagle Names'
    ]
  },
  'Modern': {
    'Sci-Fi & Future': [
      'Alien Names', 'Robot Names', 'Cyborg Names', 'Android Names',
      'Spaceship Names', 'Planet Names', 'Space Station Names',
      'Futuristic City Names', 'Cyberpunk Names'
    ],
    'Pop Culture': [
      'Superhero Names', 'Supervillain Names', 'Anime Names', 'Manga Names',
      'Video Game Names', 'Movie Names', 'TV Show Names', 'Comic Book Names'
    ],
    'Miscellaneous': [
      'God Names', 'Goddess Names', 'Deity Names', 'Titan Names',
      'Spirit Names', 'Ghost Names', 'Undead Names', 'Zombie Names',
      'Golem Names', 'Construct Names', 'Hybrid Names', 'Mutant Names'
    ]
  }
};

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const getCategoryUrl = (categoryName: string) => {
    return `/names/${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const calculateDropdownPosition = (category: string) => {
    const dropdownElement = dropdownRefs.current[category];
    if (!dropdownElement) return {};

    const rect = dropdownElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    // Calculate if dropdown would go off-screen on the right
    const dropdownWidth = 700; // Approximate dropdown width
    const rightEdge = rect.left + dropdownWidth;
    
    if (rightEdge > viewportWidth - 20) {
      // If dropdown would go off-screen, align to right
      return { right: '0px' };
    }
    
    // Otherwise center it below the button
    return { left: '50%', transform: 'translateX(-50%)' };
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              FantasyNames
            </Link>
          </div>

          {/* Desktop Navigation - Fewer main categories */}
          <nav className="hidden md:flex space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium rounded-lg"
            >
              Home
            </Link>
            
            {Object.keys(mainCategories).map((category) => (
              <div 
                key={category}
                className="relative"
                ref={el => dropdownRefs.current[category] = el}
                onMouseEnter={() => setActiveDropdown(category)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  {category} ▼
                </button>

                {/* Organized Dropdown with Subcategories */}
                {activeDropdown === category && (
                  <div 
                    className="absolute top-full bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-lg p-6 z-50 min-w-[700px]"
                    style={calculateDropdownPosition(category)}
                  >
                    <div className="grid grid-cols-3 gap-8">
                      {Object.entries(mainCategories[category as keyof typeof mainCategories]).map(([subcategory, items]) => (
                        <div key={subcategory}>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide border-b border-gray-200 dark:border-gray-600 pb-2">
                            {subcategory}
                          </h3>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <Link
                                key={item}
                                href={getCategoryUrl(item)}
                                className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 text-sm"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {item}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <Link
              href="/generate"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium rounded-lg"
            >
              AI Generate
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
            <div className="space-y-6">
              <Link
                href="/"
                className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {Object.entries(mainCategories).map(([category, subcategories]) => (
                <div key={category}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg border-b border-gray-200 dark:border-gray-600 pb-2">
                    {category}
                  </h3>
                  {Object.entries(subcategories).map(([subcategory, items]) => (
                    <div key={subcategory} className="ml-2 mb-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm">
                        {subcategory}
                      </h4>
                      <div className="grid grid-cols-2 gap-1">
                        {items.map(item => (
                          <Link
                            key={item}
                            href={getCategoryUrl(item)}
                            className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 py-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              
              <Link
                href="/generate"
                className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Generate
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}