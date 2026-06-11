'use client';

import { useMemo, useState } from 'react';
import type { MenuCategory } from '@/data/menu';
import MenuCategorySection from './MenuCategorySection';
import { ORDER_URL } from '@/lib/order';
import styles from '@/app/menu/page.module.css';

type Mode = 'sur-place' | 'livraison';

interface Props {
    menu: MenuCategory[];
}

function filterForLivraison(menu: MenuCategory[]): MenuCategory[] {
    return menu.flatMap((cat) => {
        const items = cat.items?.filter((i) => i.delivery !== false);
        const subCategories = cat.subCategories
            ?.filter((sc) => sc.delivery !== false)
            .map((sc) => ({ ...sc, items: sc.items.filter((i) => i.delivery !== false) }))
            .filter((sc) => sc.items.length > 0);

        const hasItems = (items?.length ?? 0) > 0;
        const hasSubs = (subCategories?.length ?? 0) > 0;
        if (!hasItems && !hasSubs) return [];
        return [{ ...cat, items, subCategories }];
    });
}

export default function MenuView({ menu }: Props) {
    const [mode, setMode] = useState<Mode>('sur-place');
    const displayed = useMemo(
        () => (mode === 'livraison' ? filterForLivraison(menu) : menu),
        [menu, mode],
    );

    return (
        <>
            <div className={styles.modeBar} role="tablist" aria-label="Type de menu">
                <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'sur-place'}
                    className={`${styles.modeBtn} ${mode === 'sur-place' ? styles.modeBtnActive : ''}`}
                    onClick={() => setMode('sur-place')}
                >
                    🍽️ Sur Place
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'livraison'}
                    className={`${styles.modeBtn} ${mode === 'livraison' ? styles.modeBtnActive : ''}`}
                    onClick={() => setMode('livraison')}
                >
                    🛵 Livraison
                </button>
            </div>

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

            {displayed.map((category) => (
                <MenuCategorySection key={category.title} category={category} />
            ))}
        </>
    );
}
