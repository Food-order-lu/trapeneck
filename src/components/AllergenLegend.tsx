import { ALLERGENS } from '@/data/menu';
import styles from '@/app/menu/page.module.css';

export default function AllergenLegend() {
    const entries = Object.entries(ALLERGENS).sort(
        ([a], [b]) => Number(a) - Number(b),
    );

    return (
        <aside className={styles.menuNote} aria-label="Légende des allergènes">
            <p className={styles.legendIntro}>
                <strong>Allergènes :</strong> les chiffres entre parenthèses à côté de chaque
                plat renvoient à la liste ci-dessous.
            </p>
            <ul className={styles.legendGrid}>
                {entries.map(([num, label]) => (
                    <li key={num} className={styles.legendItem}>
                        <span className={styles.legendNumber}>({num})</span> {label}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
