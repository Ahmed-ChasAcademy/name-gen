import styles from './page.module.css';

export default function Home() {
  const categories = [
    { name: 'Elves', href: '/names/elf-names', className: styles.elves },
    { name: 'Dragons', href: '/names/dragon-names', className: styles.dragons },
    { name: 'Wizards', href: '/names/wizard-names', className: styles.wizards },
    { name: 'Kingdoms', href: '/names/kingdom-names', className: styles.kingdoms },
    { name: 'Vampires', href: '/names/vampire-names', className: styles.vampires },
    { name: 'Robots', href: '/names/robot-names', className: styles.robots },
    { name: 'Gods', href: '/names/god-names', className: styles.gods },
    { name: 'Superheroes', href: '/names/superhero-names', className: styles.superheroes },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Fantasy Name Generator
          </h1>
          <p className={styles.subtitle}>
            Find the perfect names for your characters, creatures, and worlds.
          </p>
          
          <div className={styles.buttonGroup}>
            <a 
              href="/names/elf-names" 
              className={styles.primaryButton}
            >
              Browse Names
            </a>
            <a 
              href="/generate" 
              className={styles.secondaryButton}
            >
              AI Generate
            </a>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className={styles.categories}>
        <div className={styles.categoriesContent}>
          <h2 className={styles.sectionTitle}>
            Popular Categories
          </h2>
          
          <div className={styles.grid}>
            {categories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className={`${styles.categoryCard} ${category.className}`}
              >
                <div className={styles.categoryName}>
                  {category.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsContent}>
          <div className={styles.statsGrid}>
            {[
              { number: '10K+', label: 'Names' },
              { number: '50+', label: 'Categories' },
              { number: 'Instant', label: 'AI Generation' },
              { number: 'Free', label: 'Forever' }
            ].map((stat, index) => (
              <div key={index}>
                <div className={styles.statNumber}>
                  {stat.number}
                </div>
                <div className={styles.statLabel}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}