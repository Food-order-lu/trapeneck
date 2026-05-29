import type { MenuItem as MenuItemType } from '@/data/menu';
import styles from '@/app/menu/page.module.css';

interface Props {
    item: MenuItemType;
}

function formatAllergens(allergens?: number[]): string | null {
    if (!allergens || allergens.length === 0) return null;
    return `(${allergens.join(', ')})`;
}

export default function MenuItem({ item }: Props) {
    const allergens = formatAllergens(item.allergens);

    return (
        <div className={styles.item}>
            {item.pricing ? (
                <>
                    <div className={styles.itemRow}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemLeader} aria-hidden="true" />
                    </div>
                    {item.pricing.map((p) => (
                        <div className={styles.itemRow} key={p.label}>
                            <span className={styles.itemVariantLabel}>{p.label}</span>
                            <span className={styles.itemLeader} aria-hidden="true" />
                            <span className={styles.itemPrice}>{p.price}</span>
                        </div>
                    ))}
                </>
            ) : (
                <div className={styles.itemRow}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemLeader} aria-hidden="true" />
                    <span className={styles.itemPrice}>{item.price}</span>
                </div>
            )}

            {(item.description || allergens) && (
                <p className={styles.itemDescription}>
                    {item.description}
                    {item.description && allergens && ' '}
                    {allergens && <span className={styles.itemAllergens}>{allergens}</span>}
                </p>
            )}

            {item.note && <p className={styles.itemNote}>{item.note}</p>}
        </div>
    );
}
