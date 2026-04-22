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
                        <span
                            className={`glf-button ${styles.btnPrimary}`}
                            data-glf-cuid={process.env.NEXT_PUBLIC_GLORIAFOOD_CUID}
                            data-glf-ruid={process.env.NEXT_PUBLIC_GLORIAFOOD_RUID}
                            style={{ cursor: 'pointer' }}
                        >
                            Commander en Ligne
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
