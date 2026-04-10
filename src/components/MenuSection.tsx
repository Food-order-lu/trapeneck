'use client';

import { useEffect, useState } from 'react';
import { getMenuUrl } from '@/lib/firebase';
import styles from '../app/page.module.css';

export default function MenuSection() {
    const [menuImageUrl, setMenuImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Charger l'URL de l'image depuis Firebase (Trapeneck specific)
        const loadMenuUrl = async () => {
            try {
                const url = await getMenuUrl();
                if (url) {
                    setMenuImageUrl(url);
                }
            } catch (error) {
                console.error('Erreur chargement menu:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadMenuUrl();
    }, []);

    return (
        <section className={styles.section} style={{ backgroundColor: '#fff5f5' }}>
            <div className={styles.container}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#E31837', marginBottom: '0.5rem' }}>Menu de la Semaine</h2>
                    <p style={{ color: '#666', fontSize: '1.2rem' }}>Découvrez nos suggestions du moment</p>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'transparent'
                }}>
                    <div style={{ width: '100%', maxWidth: '900px' }}>
                        {isLoading ? (
                            <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                <p>⏳ Chargement du menu...</p>
                            </div>
                        ) : menuImageUrl ? (
                            <img
                                src={menuImageUrl}
                                alt="Menu de la Semaine - Restaurant Am Trapeneck"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '1rem',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    display: 'block'
                                }}
                            />
                        ) : (
                            <div style={{ padding: '3rem', textAlign: 'center', background: '#fff', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                <p>📋 Le menu de la semaine sera bientôt disponible</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
