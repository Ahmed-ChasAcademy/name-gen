import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <div className={styles.logo}>FantasyNames</div>
            <div className={styles.copyright}>
              Made with<span className={styles.heart}>♥</span>for creators everywhere
            </div>
          </div>
          
          <div className={styles.links}>
            <a href="/support" className={styles.link}>
              Support
            </a>
            <span className={styles.divider}>•</span>
            <a href="/donate" className={styles.link}>
              Donate
            </a>
            <span className={styles.divider}>•</span>
            <a href="/privacy" className={styles.link}>
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}