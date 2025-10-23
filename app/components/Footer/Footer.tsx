import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>⚔️</div>
            <div className={styles.logoText}>
              <span className={styles.logoPrimary}>Fantasy</span>
              <span className={styles.logoSecondary}>Names</span>
            </div>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <a href="/privacy" className={styles.link}>
              Privacy
            </a>
            <a href="/donate" className={styles.donateLink}>
              ❤️ Donate
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}