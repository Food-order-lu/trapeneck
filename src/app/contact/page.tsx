'use client';

import styles from './page.module.css';

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Contactez-Nous</h1>
                    <p>Nous sommes à votre écoute</p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactInfo}>
                            <h2>Informations de Contact</h2>

                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>📞</div>
                                <div className={styles.infoContent}>
                                    <h3>Téléphone</h3>
                                    <a href="tel:+35226361133">+352 26 36 11 33</a>
                                    <p>Du lundi au dimanche, pendant les heures d'ouverture</p>
                                </div>
                            </div>



                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>📍</div>
                                <div className={styles.infoContent}>
                                    <h3>Adresse</h3>
                                    <p className={styles.address}>
                                        508 route de thionville<br />
                                        L-5886 Hesperange<br />
                                        Luxembourg
                                    </p>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.infoIcon}>🌐</div>
                                <div className={styles.infoContent}>
                                    <h3>Réseaux Sociaux</h3>
                                    <a
                                        href="https://www.facebook.com/alzingen/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialLink}
                                    >
                                        Suivez-nous sur Facebook
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.hoursSection}>
                            <div className={styles.hoursCard}>
                                <h2>Horaires d&apos;Ouverture</h2>
                                <div className={styles.hoursGroup}>
                                    <h3 className={styles.hoursSubTitle}>Brasserie</h3>
                                    <div className={styles.hoursList}>
                                        <div className={styles.hourItem}>
                                            <span className={styles.day}>Lundi - Samedi</span>
                                            <span className={styles.time}>10h00 - 22h00</span>
                                        </div>
                                        <div className={styles.hourItem}>
                                            <span className={styles.day}>Dimanche</span>
                                            <span className={styles.time} style={{ color: '#ff6b35', fontWeight: 'bold' }}>Fermé</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.hoursGroup}>
                                    <h3 className={styles.hoursSubTitle}>Cuisine</h3>
                                    <div className={styles.hoursList}>
                                        <div className={styles.hourItem}>
                                            <span className={styles.day}>Déjeuner</span>
                                            <span className={styles.time}>10h00 - 14h00</span>
                                        </div>
                                        <div className={styles.hourItem}>
                                            <span className={styles.day}>Dîner</span>
                                            <span className={styles.time}>18h00 - 22h00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.ctaBox}>
                                <h3>Réserver une Table</h3>
                                <p>Appelez-nous pour réserver votre table</p>
                                <a href="tel:+35226361133" className={styles.btnPrimary}>
                                    📞 Appeler Maintenant
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mapSection}>
                        <h2>Comment Nous Trouver</h2>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://maps.google.com/maps?q=Am%20Trapeneck%2C%20508%20Route%20de%20Thionville%2C%205886%20Hesperange%2C%20Luxembourg&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Am Trapeneck Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
