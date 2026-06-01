import { MENU } from '@/data/menu';
import MenuCategorySection from '@/components/MenuCategorySection';
import AllergenLegend from '@/components/AllergenLegend';
import { ORDER_URL } from '@/lib/order';
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
                        <a
                            href={ORDER_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.orderCta}
                        >
                            Commander en Ligne
                        </a>
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
