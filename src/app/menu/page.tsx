import { MENU } from '@/data/menu';
import MenuView from '@/components/MenuView';
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
                    <MenuView menu={MENU} />
                    <AllergenLegend />
                </div>
            </section>
        </main>
    );
}
