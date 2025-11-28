'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground}>
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.heroContent}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={styles.heroText}
                >
                    <h1 className={styles.heroTitle}>
                        Bienvenue au <span className={styles.highlight}>Am Trapeneck</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Restaurant Italien & Brasserie à Hesperange
                    </p>
                    <p className={styles.heroDescription}>
                        Découvrez une cuisine italienne authentique dans une ambiance chaleureuse et conviviale
                    </p>
                    <div className={styles.heroCTA}>
                        <a
                            href="#order"
                            className={`glf-button ${styles.btnPrimary}`}
                            data-glf-cuid="YOUR_CUID_HERE"
                            data-glf-ruid="YOUR_RUID_HERE"
                        >
                            Commander en Ligne
                        </a>
                        <a href="/menu" className={styles.btnOutline}>
                            Voir le Menu
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
