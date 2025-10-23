import styles from './page.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Commitment to Your Privacy</h2>
          <p className={styles.text}>
            At Fantasy Name Generator, we believe in transparency and simplicity. 
            We&apos;ve designed our service to respect your privacy by collecting 
            as little information as possible while providing you with the best experience.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Information We Don&apos;t Collect</h2>
          <p className={styles.text}>
            We&apos;re proud to say that we don&apos;t collect or store any personal information. 
            Specifically, we don&apos;t collect:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Personal identification information (name, email, address)</li>
            <li className={styles.listItem}>Payment information (we&apos;re completely free)</li>
            <li className={styles.listItem}>Location data or IP addresses</li>
            <li className={styles.listItem}>Cookies or tracking data</li>
            <li className={styles.listItem}>User accounts or login credentials</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Local Storage Usage</h2>
          <p className={styles.text}>
            The only &quot;data storage&quot; we use is your browser&apos;s local storage to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Save your copied names temporarily</strong> - This happens entirely in your browser 
              and is never sent to our servers. When you clear your browser data, this information is gone.
            </li>
            <li className={styles.listItem}>
              <strong>Remember your theme preference</strong> - If you switch between light and dark mode, 
              we save this preference locally so the site looks the way you want it to.
            </li>
          </ul>
          <div className={styles.highlight}>
            <p className={styles.text}>
              <strong>Important:</strong> All data stored in your browser&apos;s local storage remains on your device. 
              We cannot access this information, and it&apos;s automatically deleted if you clear your browser data.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Third-Party Services</h2>
          <p className={styles.text}>
            We don&apos;t use any third-party analytics, advertising, or tracking services. 
            There are no Google Analytics, Facebook pixels, or other tracking scripts on our site.
          </p>
          <p className={styles.text}>
            The only external requests are for loading the website itself and any AI generation 
            features, which are processed anonymously.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>AI Name Generation</h2>
          <p className={styles.text}>
            When you use our AI name generator, your requests are processed to generate names. 
            These requests are not stored or associated with any user information. We don&apos;t 
            keep a history of what names you generate.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Children&apos;s Privacy</h2>
          <p className={styles.text}>
            Our service is safe for users of all ages. Since we don&apos;t collect personal information 
            or require accounts, there are no special considerations needed for children&apos;s privacy.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
          <p className={styles.text}>
            If we ever make changes to this privacy policy, we&apos;ll update this page and the 
            &quot;Last updated&quot; date. We&apos;re committed to maintaining our privacy-first approach.
          </p>
        </section>

        <div className={styles.contact}>
          <h3 className={styles.contactTitle}>Questions?</h3>
          <p className={styles.text}>
            If you have any questions about this privacy policy or our practices, 
            please visit our <a href="/support" className="text-blue-600 hover:underline">Support page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}