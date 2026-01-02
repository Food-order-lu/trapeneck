'use client';

import { useState, useEffect } from 'react';
import { getGalleryImages, GalleryImage } from '@/lib/firebase';
import styles from './page.module.css';

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'restaurant' | 'events'>('all');

    useEffect(() => {
        const loadImages = async () => {
            const galleryImages = await getGalleryImages();
            setImages(galleryImages);
            setLoading(false);
        };
        loadImages();
    }, []);

    const filteredImages = filter === 'all'
        ? images
        : images.filter(img => img.category === filter);

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1>Galerie Photos</h1>
                <p>Découvrez notre restaurant et nos événements en images</p>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${filter === 'all' ? styles.activeTab : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Tout voir
                </button>
                <button
                    className={`${styles.tab} ${filter === 'restaurant' ? styles.activeTab : ''}`}
                    onClick={() => setFilter('restaurant')}
                >
                    🍽️ Restaurant
                </button>
                <button
                    className={`${styles.tab} ${filter === 'events' ? styles.activeTab : ''}`}
                    onClick={() => setFilter('events')}
                >
                    🎉 Événements
                </button>
            </div>

            {loading ? (
                <div className={styles.loading}>Chargement des photos...</div>
            ) : (
                <div className={styles.grid}>
                    {filteredImages.length > 0 ? (
                        filteredImages.map((img) => (
                            <div key={img.id} className={styles.imageCard}>
                                <div className={styles.imageWrapper}>
                                    <img src={img.url} alt="Restaurant Trapeneck" loading="lazy" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            Aucune photo pour le moment.
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
