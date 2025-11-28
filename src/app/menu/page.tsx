'use client';

import { useEffect } from 'react';
import GloriaFoodWidget from '@/components/GloriaFoodWidget';
import styles from './page.module.css';

export default function MenuPage() {
    useEffect(() => {
        // Charger le script GloriaFood
        const script = document.createElement('script');
        script.src = 'https://www.fbgcdn.com/embedder/js/ewm2.js';
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Notre Menu</h1>
                    <p>Découvrez notre sélection de plats italiens authentiques</p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.menuIntro}>
                        <h2>Commander en Ligne</h2>
                        <p>
                            Consultez notre menu complet et passez commande directement en ligne
                            pour la livraison à domicile ou le retrait au restaurant.
                        </p>
                    </div>

                    <div className={styles.widgetContainer}>
                        <GloriaFoodWidget
                            showOrderButton={true}
                            showReservationButton={true}
                        />
                    </div>

                    <div className={styles.menuNote}>
                        <p>
                            <strong>Note:</strong> Pour consulter notre menu complet avec les prix
                            et passer commande, cliquez sur "Commander en Ligne" ci-dessus.
                            Le widget GloriaFood s'ouvrira avec toutes nos spécialités.
                        </p>
                    </div>

                    <div className={styles.menuHighlights}>
                        <h3>Nos Catégories</h3>
                        <div className={styles.categoriesGrid}>
                            <div className={styles.categoryCard}>
                                <span className={styles.categoryIcon}>🍕</span>
                                <h4>Pizzas</h4>
                                <p>Pizzas artisanales cuites au four traditionnel</p>
                            </div>
                            <div className={styles.categoryCard}>
                                <span className={styles.categoryIcon}>🍝</span>
                                <h4>Pâtes</h4>
                                <p>Pâtes fraîches avec sauces maison</p>
                            </div>
                            <div className={styles.categoryCard}>
                                <span className={styles.categoryIcon}>🥗</span>
                                <h4>Salades</h4>
                                <p>Salades fraîches et généreuses</p>
                            </div>
                            <div className={styles.categoryCard}>
                                <span className={styles.categoryIcon}>🍖</span>
                                <h4>Viandes</h4>
                                <p>Spécialités italiennes grillées</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
