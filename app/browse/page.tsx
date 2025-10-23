import styles from './page.module.css';

const browseCategories = [
  {
    title: 'Fantasy',
    icon: '🧙',
    description: 'Magical beings, mythical creatures, and enchanted items',
    links: [
      { name: 'Elf Names', href: '/names/elf-names' },
      { name: 'Dragon Names', href: '/names/dragon-names' },
      { name: 'Wizard Names', href: '/names/wizard-names' },
      { name: 'Fairy Names', href: '/names/fairy-names' },
      { name: 'Angel Names', href: '/names/angel-names' },
      { name: 'Demon Names', href: '/names/demon-names' },
      { name: 'Vampire Names', href: '/names/vampire-names' },
      { name: 'Werewolf Names', href: '/names/werewolf-names' }
    ]
  },
  {
    title: 'Characters',
    icon: '⚔️',
    description: 'Heroes, villains, warriors, and magic users',
    links: [
      { name: 'Warrior Names', href: '/names/warrior-names' },
      { name: 'Knight Names', href: '/names/knight-names' },
      { name: 'Paladin Names', href: '/names/paladin-names' },
      { name: 'Ranger Names', href: '/names/ranger-names' },
      { name: 'Barbarian Names', href: '/names/barbarian-names' },
      { name: 'Samurai Names', href: '/names/samurai-names' },
      { name: 'Ninja Names', href: '/names/ninja-names' },
      { name: 'Hero Names', href: '/names/hero-names' }
    ]
  },
  {
    title: 'Worlds & Locations',
    icon: '🗺️',
    description: 'Kingdoms, cities, and mystical places',
    links: [
      { name: 'Kingdom Names', href: '/names/kingdom-names' },
      { name: 'Empire Names', href: '/names/empire-names' },
      { name: 'City Names', href: '/names/city-names' },
      { name: 'Town Names', href: '/names/town-names' },
      { name: 'Village Names', href: '/names/village-names' },
      { name: 'Castle Names', href: '/names/castle-names' },
      { name: 'Fortress Names', href: '/names/fortress-names' },
      { name: 'Temple Names', href: '/names/temple-names' }
    ]
  },
  {
    title: 'Creatures & Monsters',
    icon: '🐲',
    description: 'Mythical beasts and magical creatures',
    links: [
      { name: 'Dragon Names', href: '/names/dragon-names' },
      { name: 'Griffin Names', href: '/names/griffin-names' },
      { name: 'Phoenix Names', href: '/names/phoenix-names' },
      { name: 'Unicorn Names', href: '/names/unicorn-names' },
      { name: 'Pegasus Names', href: '/names/pegasus-names' },
      { name: 'Sphinx Names', href: '/names/sphinx-names' },
      { name: 'Chimera Names', href: '/names/chimera-names' },
      { name: 'Kraken Names', href: '/names/kraken-names' }
    ]
  },
  {
    title: 'Modern & Sci-Fi',
    icon: '🚀',
    description: 'Futuristic and contemporary names',
    links: [
      { name: 'Robot Names', href: '/names/robot-names' },
      { name: 'Alien Names', href: '/names/alien-names' },
      { name: 'Cyborg Names', href: '/names/cyborg-names' },
      { name: 'Android Names', href: '/names/android-names' },
      { name: 'Spaceship Names', href: '/names/spaceship-names' },
      { name: 'Planet Names', href: '/names/planet-names' },
      { name: 'Superhero Names', href: '/names/superhero-names' },
      { name: 'Supervillain Names', href: '/names/supervillain-names' }
    ]
  },
  {
    title: 'Mythology & Gods',
    icon: '⚡',
    description: 'Divine beings and mythological figures',
    links: [
      { name: 'God Names', href: '/names/god-names' },
      { name: 'Goddess Names', href: '/names/goddess-names' },
      { name: 'Deity Names', href: '/names/deity-names' },
      { name: 'Titan Names', href: '/names/titan-names' },
      { name: 'Spirit Names', href: '/names/spirit-names' },
      { name: 'Ghost Names', href: '/names/ghost-names' },
      { name: 'Undead Names', href: '/names/undead-names' },
      { name: 'Celestial Names', href: '/names/celestial-names' }
    ]
  }
];

export default function BrowsePage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Browse All Name Categories</h1>
        <p className={styles.subtitle}>
          Explore our complete collection of fantasy names organized by category
        </p>
      </div>

      {/* Categories List */}
      <div className={styles.categoriesList}>
        {browseCategories.map((category) => (
          <section key={category.title} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>
                {category.icon}
              </div>
              <div>
                <h2 className={styles.categoryTitle}>{category.title}</h2>
                <p className={styles.categoryDescription}>{category.description}</p>
              </div>
            </div>

            <div className={styles.linksGrid}>
              {category.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={styles.categoryLink}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}