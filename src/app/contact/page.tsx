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
                                <h2>Horaires d'Ouverture</h2>
                                <div className={styles.hoursList}>
                                    <div className={styles.hourItem}>
                                        <span className={styles.day}>Lundi</span>
                                        <span className={styles.time}>11h30 - 14h00<br />18h00 - 22h00</span>
                                    </div>
                                    <div className={styles.hourItem}>
                                        <span className={styles.day}>Mardi</span>
                                        <span className={styles.time}>11h30 - 14h00<br />18h00 - 22h00</span>
                                    </div>
                                    <div className={styles.hourItem}>
                                        <span className={styles.day}>Mercredi</span>
                                        <span className={styles.time}>11h30 - 14h00<br />18h00 - 22h00</span>
                                    </div>
                                    <div className={styles.hourItem}>
                                        <span className={styles.day}>Jeudi</span>
                                        <span className={styles.time}>11h30 - 14h00<br />18h00 - 22h00</span>
                                    </div>
                                    <div className={styles.hourItem}>
                                        <span className={styles.day}>Vendredi</span>
                                        <span className={styles.time}>11h30 - 14h00<br />18h00 - 22h00</span>
                                    </div>
                                    <div className={styles.hourItem}>
                                        <span className={styles.day}>Samedi</span>
                                        <span className={styles.time}>11h30 - 14h00<br />18h00 - 22h00</span>
                                    </div>
                                    <div className={styles.hourItem}>
                                        <span className={styles.day}>Dimanche</span>
                                        <span className={styles.time}>11h30 - 14h00<br />18h00 - 22h00</span>
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
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2591.246695287667!2d6.158580276634336!3d49.56804135313936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479548b1114a87c1%3A0x63391d4e0e56728a!2sAm%20Trapeneck!5e0!3m2!1sen!2slu!4v1711924261000!5m2!1sen!2slu"
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
