import { MENU } from '@/data/menu';
import MenuCategorySection from '@/components/MenuCategorySection';
import AllergenLegend from '@/components/AllergenLegend';
import styles from './page.module.css';

export default function MenuPage() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Notre Menu</h1>
                    <p>Découvrez notre sélection de plats italiens et luxembourgeois authentiques</p>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.ctaBar}>
                        <span
                            className={`glf-button ${styles.orderCta}`}
                            data-glf-cuid={process.env.NEXT_PUBLIC_GLORIAFOOD_CUID}
                            data-glf-ruid={process.env.NEXT_PUBLIC_GLORIAFOOD_RUID}
                            style={{ cursor: 'pointer' }}
                        >
                            Commander en Ligne
                        </span>
                    </div>

                    {MENU.map((category) => (
                        <MenuCategorySection key={category.title} category={category} />
                    ))}

                    <AllergenLegend />
                </div>
            </section>
        </main>
    );
}
