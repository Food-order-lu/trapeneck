'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import ServiceCard from '@/components/ServiceCard';
import OrderWidget from '@/components/OrderWidget';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <Hero />

            {/* Menu du Jour Section */}
            <MenuSection />

            {/* About Section */}
            <section className={styles.section} id="about">
                <div className={styles.container}>
                    <div className={styles.textCenter}>
                        <h2 className={styles.sectionTitle}>Bienvenue au Restaurant Am Trapeneck</h2>
                        <p className={styles.sectionSubtitle}>
                            Une expérience culinaire italienne authentique à Hesperange
                        </p>
                    </div>

                    <div className={styles.aboutContent}>
                        <div className={styles.aboutText}>
                            <p>
                                Bienvenue au <strong>Restaurant Am Trapeneck</strong>, situé à Hesperange, où nous vous
                                accueillons dans une ambiance chaleureuse et conviviale tous les jours de la semaine.
                            </p>
                            <p>
                                Notre établissement propose une <strong>cuisine italienne authentique</strong>,
                                préparée avec des ingrédients frais et de qualité. Pizzas artisanales, pâtes fraîches
                                et spécialités italiennes vous attendent pour un déjeuner rapide, un dîner
                                en famille ou entre amis.
                            </p>
                            <p>
                                Nous sommes également une <strong>brasserie</strong> proposant une sélection de boissons
                                et une atmosphère décontractée parfaite pour se détendre.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className={styles.sectionDark} id="services">
                <div className={styles.container}>
                    <div className={styles.textCenter}>
                        <h2 className={styles.sectionTitleLight}>Nos Services</h2>
                        <p className={styles.sectionSubtitleLight}>
                            Flexibilité et qualité pour votre plus grand plaisir
                        </p>
                    </div>

                    <div className={styles.grid}>
                        <ServiceCard
                            icon="🍽️"
                            title="Sur Place"
                            description="Profitez d'une ambiance cosy et conviviale dans notre restaurant chaleureux"
                        />
                        <ServiceCard
                            icon="📦"
                            title="À Emporter"
                            description="Commandez vos plats préférés et venez les chercher à votre convenance"
                        />
                        <ServiceCard
                            icon="🚗"
                            title="Livraison"
                            description="Profitez de notre service de livraison rapide et fiable à domicile"
                        />
                    </div>
                </div>
            </section>

            {/* Commander en Ligne Section */}
            <section className={styles.orderSection}>
                <div className={styles.container}>
                    <div className={styles.orderContent}>
                        <div className={styles.orderTextBox}>
                            <h2>Commander en Ligne</h2>
                            <p>
                                Commandez directement en ligne pour la livraison à domicile ou le retrait au restaurant.
                                Menu complet disponible !
                            </p>
                        </div>
                        <OrderWidget
                            showOrderButton={true}
                            showReservationButton={true}
                        />
                    </div>
                </div>
            </section>

            {/* Specialties Section */}
            <section className={styles.section} id="specialties">
                <div className={styles.container}>
                    <div className={styles.textCenter}>
                        <h2 className={styles.sectionTitle}>Nos Spécialités</h2>
                        <p className={styles.sectionSubtitle}>
                            Un large choix pour ravir tous les palais
                        </p>
                    </div>

                    <div className={styles.specialtiesGrid}>
                        <div className={styles.specialtyCard}>
                            <div className={styles.specialtyImage} style={{
                                backgroundImage: 'url(/trapeneck/images/img10.jpg)'
                            }}></div>
                            <div className={styles.specialtyContent}>
                                <h3>Pizzas Artisanales</h3>
                                <p>
                                    Nos pizzas sont préparées avec des ingrédients frais et cuites au four traditionnel.
                                    Pâte fine et croustillante, garnitures généreuses.
                                </p>
                            </div>
                        </div>

                        <div className={styles.specialtyCard}>
                            <div className={styles.specialtyImage} style={{
                                backgroundImage: 'url(/trapeneck/images/img16.jpg)'
                            }}></div>
                            <div className={styles.specialtyContent}>
                                <h3>Pâtes Fraîches</h3>
                                <p>
                                    Découvrez nos pâtes fraîches préparées selon les traditions italiennes,
                                    accompagnées de sauces maison savoureuses.
                                </p>
                            </div>
                        </div>

                        <div className={styles.specialtyCard}>
                            <div className={styles.specialtyImage} style={{
                                backgroundImage: 'url(/trapeneck/images/img19.jpg)'
                            }}></div>
                            <div className={styles.specialtyContent}>
                                <h3>Cuisine Italienne</h3>
                                <p>
                                    Plats italiens authentiques, préparés avec passion et
                                    savoir-faire pour une expérience gastronomique unique.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.sectionDark} id="contact">
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactInfo}>
                            <h2 className={styles.sectionTitleLight}>Nous Contacter</h2>
                            <p className={styles.contactText}>
                                N'hésitez pas à nous contacter pour toute question ou pour réserver votre table.
                            </p>

                            <div className={styles.contactDetails}>
                                <div className={styles.contactItem}>
                                    <div className={styles.contactIcon}>📞</div>
                                    <div>
                                        <h4>Téléphone</h4>
                                        <a href="tel:+35226361133">+352 26 36 11 33</a>
                                    </div>
                                </div>

                                <div className={styles.contactItem}>
                                    <div className={styles.contactIcon}>📍</div>
                                    <div>
                                        <h4>Adresse</h4>
                                        <p>508 route de thionville<br />L-5886 Hesperange</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.cta}>
                                <a href="tel:+35226361133" className={styles.btnPrimary}>
                                    Réserver une Table
                                </a>
                            </div>
                        </div>

                        <div className={styles.hoursCard}>
                            <h3>Horaires d&apos;Ouverture</h3>
                            <div className={styles.hoursGrid}>
                                <div className={styles.hoursSection}>
                                    <h4 className={styles.hoursSubTitle}>Brasserie</h4>
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
                                <div className={styles.hoursSection}>
                                    <h4 className={styles.hoursSubTitle}>Cuisine</h4>
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
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
