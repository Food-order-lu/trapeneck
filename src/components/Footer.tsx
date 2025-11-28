import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Am Trapeneck</h3>
                        <p className={styles.footerText}>
                            Restaurant italien et brasserie à Hesperange, Luxembourg.
                            Cuisine authentique et conviviale depuis toujours.
                        </p>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.sectionTitle}>Contact</h4>
                        <div className={styles.contactInfo}>
                            <p>📞 <a href="tel:+35226361133">26 36 11 33</a></p>
                            <p>✉️ <a href="mailto:info@am-trapeneck.lu">info@am-trapeneck.lu</a></p>
                            <p>📍 508 route de thionville<br />L-5886 Hesperange</p>
                        </div>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.sectionTitle}>Horaires</h4>
                        <p className={styles.hours}>Tous les jours</p>
                        <p className={styles.hours}>11h30 - 14h00</p>
                        <p className={styles.hours}>18h00 - 22h00</p>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.sectionTitle}>Navigation</h4>
                        <nav className={styles.footerNav}>
                            <Link href="/">Accueil</Link>
                            <Link href="/menu">Menu</Link>
                            <Link href="/contact">Contact</Link>
                            <a href="https://www.facebook.com/alzingen/" target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        </nav>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; {new Date().getFullYear()} Am Trapeneck. Tous droits réservés.</p>
                    <p className={styles.websiteLink}>
                        Site web: <a href="https://www.am-trapeneck.lu" target="_blank" rel="noopener noreferrer">
                            www.am-trapeneck.lu
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
