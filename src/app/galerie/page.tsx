'use client';

import { useState, useEffect } from 'react';
import { getGalleryImages, getPublications, GalleryImage, Publication } from '@/lib/firebase';
import PublicationCard from '@/components/PublicationCard';
import styles from './page.module.css';

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'restaurant' | 'events'>('all');

    useEffect(() => {
        const loadImages = async () => {
            const [galleryImages, pubs] = await Promise.all([getGalleryImages(), getPublications()]);
            setImages(galleryImages);
            setPublications(pubs);
            // Arriving from a home-page event card (/galerie#pub-<id>): open the
            // Événements tab so the linked event is rendered and can be scrolled to.
            if (window.location.hash.startsWith('#pub-')) setFilter('events');
            setLoading(false);
        };
        loadImages();
    }, []);

    useEffect(() => {
        if (loading) return;
        const hash = window.location.hash;
        if (!hash.startsWith('#pub-')) return;
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [loading]);

    const filteredImages = filter === 'all'
        ? images
        : images.filter(img => img.category === filter);

    const showPublications = filter !== 'restaurant' && publications.length > 0;

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
                <>
                {showPublications && (
                    <div className={styles.publicationsGrid}>
                        {publications.map((pub) => (
                            <PublicationCard key={pub.id} publication={pub} />
                        ))}
                    </div>
                )}
                <div className={styles.grid}>
                    {filteredImages.length > 0 ? (
                        filteredImages.map((img) => (
                            <div key={img.id} className={styles.imageCard}>
                                <div className={styles.imageWrapper}>
                                    <img src={img.url} alt="Restaurant Trapeneck" loading="lazy" />
                                </div>
                            </div>
                        ))
                    ) : !showPublications ? (
                        <div className={styles.emptyState}>
                            Aucune photo pour le moment.
                        </div>
                    ) : null}
                </div>
                </>
            )}
        </main>
    );
}
