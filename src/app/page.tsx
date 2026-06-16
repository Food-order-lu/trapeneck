'use client';

import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
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
                                Nous sommes ravis de vous accueillir au <strong>Restaurant Am Trapeneck</strong>, niché
                                au cœur d&apos;Hesperange. Ici, chaque jour de la semaine, nos portes s&apos;ouvrent pour
                                vous offrir bien plus qu&apos;un simple repas : un véritable moment de partage, dans une
                                atmosphère chaleureuse où vous vous sentirez immédiatement chez vous.
                            </p>
                            <p>
                                Chez Am Trapeneck, cuisiner avec passion et générosité est notre engagement de chaque
                                instant. Nous mettons tout notre cœur à sélectionner des produits de qualité pour vous
                                proposer des saveurs authentiques qui éveillent les papilles et réchauffent l&apos;âme.
                            </p>
                            <p>
                                Notre philosophie est aussi sincère que simple : vous régaler, à chaque visite, avec
                                constance et amour du bon goût. C&apos;est pourquoi nous sommes fiers de vous proposer une
                                belle carte autour de nos spécialités :
                            </p>
                            <ul className={styles.specialtiesList}>
                                <li>🍕 <strong>Pizzas artisanales</strong>, dorées à souhait</li>
                                <li>🍝 <strong>Pâtes fraîches</strong>, préparées avec soin</li>
                                <li>🇮🇹 <strong>Spécialités italiennes</strong>, fidèles à la tradition</li>
                                <li>🇱🇺 <strong>Spécialités luxembourgeoises</strong>, en hommage à notre belle région</li>
                            </ul>
                            <p>
                                Laissez-vous tenter par nos plats généreux, accompagnés d&apos;une boisson
                                rafraîchissante… et surtout, prenez le temps de souffler et de profiter ! Notre espace
                                brasserie, à l&apos;atmosphère détendue et conviviale, est l&apos;endroit idéal pour une
                                pause bien méritée, entre amis, en famille ou entre collègues.
                            </p>
                            <p>
                                Votre fidélité est notre plus belle récompense, et nous vous en sommes profondément
                                reconnaissants.
                            </p>
                            <p>
                                Nous avons hâte de vous retrouver très bientôt autour d&apos;une belle table ! 🍽️
                            </p>
                            <p>
                                <strong>À très vite au Restaurant Am Trapeneck !</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
