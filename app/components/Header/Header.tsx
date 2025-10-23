'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import styles from './Header.module.css';

const mainCategories = {
  'Fantasy': {
    'Races & Beings': [
      'Elf Names', 'Dwarf Names', 'Orc Names', 'Fairy Names', 'Angel Names', 
      'Demon Names', 'Vampire Names', 'Werewolf Names', 'Dragon Names'
    ],
    'Creatures & Monsters': [
      'Griffin Names', 'Phoenix Names', 'Unicorn Names', 'Pegasus Names',
      'Sphinx Names', 'Chimera Names', 'Basilisk Names', 'Kraken Names'
    ],
    'Magic & Items': [
      'Spell Names', 'Magic Item Names', 'Potion Names', 'Artifact Names',
      'Weapon Names', 'Sword Names', 'Staff Names', 'Wand Names'
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
      'Lord Names', 'Lady Names', 'Emperor Names', 'Empress Names'
    ]
  },
  'Worlds': {
    'Places & Locations': [
      'Kingdom Names', 'Empire Names', 'City Names', 'Town Names',
      'Village Names', 'Castle Names', 'Fortress Names', 'Temple Names'
    ],
    'Animals & Pets': [
      'Dragon Pets', 'Wolf Names', 'Cat Names', 'Bird Names',
      'Horse Names', 'Owl Names', 'Raven Names', 'Fox Names'
    ]
  },
  'Modern': {
    'Sci-Fi & Future': [
      'Alien Names', 'Robot Names', 'Cyborg Names', 'Android Names',
      'Spaceship Names', 'Planet Names', 'Space Station Names'
    ],
    'Pop Culture': [
      'Superhero Names', 'Supervillain Names', 'Anime Names', 'Manga Names',
      'Video Game Names', 'Movie Names', 'TV Show Names'
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
    document.documentElement.classList.toggle('dark');
  };

  const getCategoryUrl = (categoryName: string) => {
    return `/names/${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>FN</div>
            <div className={styles.logoText}>FantasyNames</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            
            {Object.keys(mainCategories).map((category) => (
              <div 
                key={category}
                className={styles.dropdown}
                ref={el => { dropdownRefs.current[category] = el; }}
                onMouseEnter={() => setActiveDropdown(category)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={styles.navButton}>
                  {category}
                  <span className={styles.chevron}>▼</span>
                </button>

                {activeDropdown === category && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownGrid}>
                      {Object.entries(mainCategories[category as keyof typeof mainCategories]).map(([subcategory, items]) => (
                        <div key={subcategory} className={styles.dropdownSection}>
                          <h3 className={styles.dropdownTitle}>{subcategory}</h3>
                          {items.map((item) => (
                            <Link
                              key={item}
                              href={getCategoryUrl(item)}
                              className={styles.dropdownItem}
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <Link href="/generate" className={styles.primaryButton}>
              AI Generate
            </Link>
          </nav>

          {/* Right Side */}
          <div className={styles.rightSection}>
            <button
              onClick={toggleTheme}
              className={styles.themeButton}
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={styles.mobileMenuButton}
            >
              <span className={styles.mobileMenuLine}></span>
              <span className={styles.mobileMenuLine}></span>
              <span className={styles.mobileMenuLine}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileNav}>
              <Link
                href="/"
                className={styles.navLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {Object.entries(mainCategories).map(([category, subcategories]) => (
                <div key={category} className={styles.mobileCategory}>
                  <h3 className={styles.mobileCategoryTitle}>{category}</h3>
                  {Object.entries(subcategories).map(([subcategory, items]) => (
                    <div key={subcategory} className={styles.mobileSubcategory}>
                      <h4 className={styles.mobileSubcategoryTitle}>{subcategory}</h4>
                      <div className={styles.mobileItemsGrid}>
                        {items.map(item => (
                          <Link
                            key={item}
                            href={getCategoryUrl(item)}
                            className={styles.mobileItem}
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
                className={styles.primaryButton}
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