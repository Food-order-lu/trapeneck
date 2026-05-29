import type { MenuCategory } from '@/data/menu';
import MenuItem from './MenuItem';
import styles from '@/app/menu/page.module.css';

interface Props {
    category: MenuCategory;
}

export default function MenuCategorySection({ category }: Props) {
    return (
        <section className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.title}</h2>

            {category.items && (
                <div className={styles.itemsList}>
                    {category.items.map((item, i) => (
                        <MenuItem key={`${item.name}-${i}`} item={item} />
                    ))}
                </div>
            )}

            {category.subCategories?.map((sub) => (
                <div key={sub.title} className={styles.subCategory}>
                    <h3 className={styles.subCategoryTitle}>{sub.title}</h3>
                    <div className={styles.itemsList}>
                        {sub.items.map((item, i) => (
                            <MenuItem key={`${item.name}-${i}`} item={item} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
