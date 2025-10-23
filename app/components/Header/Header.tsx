'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryUrl = (categoryName: string) => {
    return `/names/${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
  };

  const toggleDropdown = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.nav}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeDropdown}>
            <div className={styles.logoIcon}>⚔️</div>
            <div className={styles.logoText}>
              <span className={styles.logoPrimary}>Fantasy</span>
              <span className={styles.logoSecondary}>Names</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} ref={dropdownRef}>
            <Link href="/" className={styles.navLink} onClick={closeDropdown}>
              <span className={styles.navIcon}>🏠</span>
              Home
            </Link>
            
            {Object.keys(mainCategories).map((category) => (
              <div 
                key={category}
                className={styles.dropdown}
              >
                <button 
                  className={`${styles.navButton} ${activeDropdown === category ? styles.navButtonActive : ''}`}
                  onClick={() => toggleDropdown(category)}
                >
                  <span className={styles.navIcon}>
                    {category === 'Fantasy' && '🧙'}
                    {category === 'Characters' && '👤'}
                    {category === 'Worlds' && '🌍'}
                    {category === 'Modern' && '🚀'}
                  </span>
                  {category}
                  <span className={`${styles.chevron} ${activeDropdown === category ? styles.chevronActive : ''}`}>
                    ▼
                  </span>
                </button>

                {activeDropdown === category && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownGrid}>
                      {Object.entries(mainCategories[category as keyof typeof mainCategories]).map(([subcategory, items]) => (
                        <div key={subcategory} className={styles.dropdownSection}>
                          <h4 className={styles.dropdownTitle}>
                            <span className={styles.subcategoryIcon}>▸</span>
                            {subcategory}
                          </h4>
                          <div className={styles.dropdownItems}>
                            {items.map((item) => (
                              <Link
                                key={item}
                                href={getCategoryUrl(item)}
                                className={styles.dropdownItem}
                                onClick={closeDropdown}
                              >
                                <span className={styles.itemIcon}>•</span>
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
            
            <Link href="/generate" className={styles.primaryButton} onClick={closeDropdown}>
              <span className={styles.buttonIcon}>✨</span>
              AI Generate
              <span className={styles.buttonBadge}>NEW</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className={styles.rightSection}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonActive : ''}`}
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
            <div className={styles.mobileMenuHeader}>
              <h3>Navigation Menu</h3>
              <button 
                className={styles.mobileMenuClose}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className={styles.mobileNav}>
              <Link
                href="/"
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.mobileNavIcon}>🏠</span>
                Home
              </Link>
              
              {Object.entries(mainCategories).map(([category, subcategories]) => (
                <div key={category} className={styles.mobileCategory}>
                  <button 
                    className={styles.mobileCategoryButton}
                    onClick={(e) => {
                      const button = e.currentTarget;
                      const content = button.nextElementSibling as HTMLElement;
                      content.style.display = content.style.display === 'block' ? 'none' : 'block';
                    }}
                  >
                    <span className={styles.mobileCategoryIcon}>
                      {category === 'Fantasy' && '🧙'}
                      {category === 'Characters' && '👤'}
                      {category === 'Worlds' && '🌍'}
                      {category === 'Modern' && '🚀'}
                    </span>
                    {category}
                    <span className={styles.mobileChevron}>▼</span>
                  </button>
                  
                  <div className={styles.mobileCategoryContent}>
                    {Object.entries(subcategories).map(([subcategory, items]) => (
                      <div key={subcategory} className={styles.mobileSubcategory}>
                        <h4 className={styles.mobileSubcategoryTitle}>
                          <span className={styles.mobileSubcategoryIcon}>▸</span>
                          {subcategory}
                        </h4>
                        <div className={styles.mobileItemsGrid}>
                          {items.map(item => (
                            <Link
                              key={item}
                              href={getCategoryUrl(item)}
                              className={styles.mobileItem}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className={styles.mobileItemIcon}>•</span>
                              {item}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <Link
                href="/generate"
                className={styles.mobilePrimaryButton}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className={styles.mobileButtonIcon}>✨</span>
                AI Generate
                <span className={styles.mobileButtonBadge}>NEW</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}