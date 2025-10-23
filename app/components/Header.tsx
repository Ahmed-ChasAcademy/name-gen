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
    // Add your theme logic here
    document.documentElement.classList.toggle('dark');
  };

  const getCategoryUrl = (categoryName: string) => {
    return `/names/${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const calculateDropdownPosition = (category: string) => {
    const dropdownElement = dropdownRefs.current[category];
    if (!dropdownElement) return {};

    const rect = dropdownElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    const dropdownWidth = 700;
    const rightEdge = rect.left + dropdownWidth;
    
    if (rightEdge > viewportWidth - 20) {
      return { right: '0px' };
    }
    
    return { left: '50%', transform: 'translateX(-50%)' };
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">FN</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                FantasyNames
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
            >
              🏠 Home
            </Link>
            
            {Object.keys(mainCategories).map((category) => (
              <div 
                key={category}
                className="relative"
                ref={el => dropdownRefs.current[category] = el}
                onMouseEnter={() => setActiveDropdown(category)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 flex items-center space-x-1">
                  <span>
                    {category === 'Fantasy' && '🧙'}
                    {category === 'Characters' && '⚔️'}
                    {category === 'Worlds' && '🗺️'}
                    {category === 'Modern' && '🚀'}
                  </span>
                  <span>{category}</span>
                  <span className="text-xs opacity-60">▼</span>
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === category && (
                  <div 
                    className="absolute top-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-6 z-50 min-w-[700px] animate-in fade-in-0 zoom-in-95 duration-200"
                    style={calculateDropdownPosition(category)}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(mainCategories[category as keyof typeof mainCategories]).map(([subcategory, items]) => (
                        <div key={subcategory} className="space-y-3">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide border-b border-purple-200 dark:border-purple-800 pb-2 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>{subcategory}</span>
                          </h3>
                          <div className="space-y-1.5">
                            {items.map((item) => (
                              <Link
                                key={item}
                                href={getCategoryUrl(item)}
                                className="block text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 py-1.5 px-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-sm border border-transparent hover:border-purple-200 dark:hover:border-purple-800 group/item"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span className="group-hover/item:translate-x-1 transition-transform duration-200 block">
                                  {item}
                                </span>
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
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white transition-all duration-300 font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-purple-400/20"
            >
              ✨ AI Generate
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 shadow-sm"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <span className="block w-5 h-0.5 bg-current transition-transform duration-300"></span>
                <span className="block w-5 h-0.5 bg-current transition-transform duration-300"></span>
                <span className="block w-5 h-0.5 bg-current transition-transform duration-300"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md max-h-[80vh] overflow-y-auto animate-in slide-in-from-top duration-300">
            <div className="space-y-4">
              <Link
                href="/"
                className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-transparent hover:border-purple-200 dark:hover:border-purple-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              
              {Object.entries(mainCategories).map(([category, subcategories]) => (
                <div key={category} className="border border-gray-200/50 dark:border-gray-700/50 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/50">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg border-b border-purple-200 dark:border-purple-800 pb-2 flex items-center space-x-2">
                    <span>
                      {category === 'Fantasy' && '🧙'}
                      {category === 'Characters' && '⚔️'}
                      {category === 'Worlds' && '🗺️'}
                      {category === 'Modern' && '🚀'}
                    </span>
                    <span>{category}</span>
                  </h3>
                  {Object.entries(subcategories).map(([subcategory, items]) => (
                    <div key={subcategory} className="ml-2 mb-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 text-sm flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                        <span>{subcategory}</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {items.map(item => (
                          <Link
                            key={item}
                            href={getCategoryUrl(item)}
                            className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 py-2 px-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-gray-200 dark:border-gray-600 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200"
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
                className="block bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white transition-all duration-300 font-medium py-3 px-4 rounded-lg shadow-lg text-center border border-purple-400/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✨ AI Generate
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}