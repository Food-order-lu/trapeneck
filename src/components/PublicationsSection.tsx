'use client';

import { useEffect, useState } from 'react';
import { getPublications, type Publication } from '@/lib/firebase';
import PublicationCard from './PublicationCard';
import styles from './PublicationsSection.module.css';

export default function PublicationsSection() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPublications()
            .then((data) => setPublications(data))
            .catch((err) => console.error('Erreur chargement publications:', err))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading || publications.length === 0) return null;

    return (
        <section className={styles.section} id="actualites">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Actualités &amp; Événements</h2>
                    <p className={styles.subtitle}>
                        Restez informés des prochains événements et nouveautés du restaurant
                    </p>
                </div>
                <div className={styles.grid}>
                    {publications.map((pub) => (
                        <PublicationCard key={pub.id} publication={pub} />
                    ))}
                </div>
            </div>
        </section>
    );
}
