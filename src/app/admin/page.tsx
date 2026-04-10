'use client';

import { useState, useEffect } from 'react';
import { saveMenuUrl, getMenuUrl, addGalleryImage, getGalleryImages, deleteGalleryImage, GalleryImage, uploadImage } from '@/lib/firebase';
import { resizeImage, createLocalPreview } from '@/lib/image';
import styles from './page.module.css';

const ADMIN_PASSWORD = 'Trapeneck5886**';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Menu States
    const [menuImageUrl, setMenuImageUrl] = useState('');
    const [localPreviewUrl, setLocalPreviewUrl] = useState('');

    // Gallery States
    const [galleryCategory, setGalleryCategory] = useState<'restaurant' | 'events'>('restaurant');
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [activeTab, setActiveTab] = useState<'menu' | 'gallery'>('menu');

    // Common Upload States
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Vérifier si déjà connecté
        const auth = sessionStorage.getItem('trapeneck_admin');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }

        const loadContent = async () => {
            try {
                const url = await getMenuUrl();
                if (url) setMenuImageUrl(url);

                const images = await getGalleryImages();
                setGalleryImages(images);
            } catch (err) {
                console.error('Erreur chargement:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadContent();
    }, []);

    // Protection contre la fermeture accidentelle pendant l'upload
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isUploading) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isUploading]);

    // Cleanup des URLs locales
    useEffect(() => {
        return () => {
            if (localPreviewUrl) {
                URL.revokeObjectURL(localPreviewUrl);
            }
        };
    }, [localPreviewUrl]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('trapeneck_admin', 'true');
            setError('');
        } else {
            setError('Mot de passe incorrect');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('trapeneck_admin');
    };

    const handleMenuUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadSuccess(false);
        setError('');
        setUploadProgress(0);

        const localUrl = createLocalPreview(file);
        setLocalPreviewUrl(localUrl);
        setIsUploading(true);
        setUploadProgress(10);

        try {
            setUploadProgress(20);
            const compressedBlob = await resizeImage(file);
            const compressedFile = new File([compressedBlob], file.name, { type: file.type });
            setUploadProgress(40);

            const publicUrl = await uploadImage(compressedFile, 'menu', (p) => {
                // On mappe le 0-100% de l'upload sur l'intervalle 40-90% de la barre UI
                setUploadProgress(Math.round(40 + (p * 0.5)));
            });

            if (publicUrl) {
                const result = await saveMenuUrl(publicUrl);
                setUploadProgress(95);

                if (result.success) {
                    setMenuImageUrl(publicUrl);
                    setLocalPreviewUrl('');
                    setUploadSuccess(true);
                    setUploadProgress(100);
                } else {
                    setError(`Erreur sauvegarde: ${result.error}`);
                }
            } else {
                setError('Erreur upload Firebase Storage.');
            }
        } catch (err) {
            setError('Erreur technique. Réessayez.');
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(10);
        setError('');

        try {
            setUploadProgress(30);
            const compressedBlob = await resizeImage(file);
            const compressedFile = new File([compressedBlob], file.name, { type: file.type });

            setUploadProgress(50);
            const publicUrl = await uploadImage(compressedFile, 'gallery', (p) => {
                // On mappe le 0-100% de l'upload sur l'intervalle 50-95% de la barre UI
                setUploadProgress(Math.round(50 + (p * 0.45)));
            });

            if (publicUrl) {
                const result = await addGalleryImage(publicUrl, galleryCategory);
                setUploadProgress(100);

                if (result.success) {
                    const images = await getGalleryImages();
                    setGalleryImages(images);
                    setUploadSuccess(true);
                    setTimeout(() => setUploadSuccess(false), 3000);
                } else {
                    setError(`Erreur sauvegarde: ${result.error}`);
                }
            } else {
                setError('Erreur upload Firebase Storage.');
            }
        } catch (err) {
            setError('Erreur upload.');
            console.error(err);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDeleteGalleryImage = async (id: string, url: string) => {
        if (confirm('Voulez-vous vraiment supprimer cette image ?')) {
            const result = await deleteGalleryImage(id, url);
            if (result.success) {
                const images = await getGalleryImages();
                setGalleryImages(images);
            } else {
                alert('Erreur: ' + result.error);
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.loginCard}>
                    <div className={styles.logo}>🍝</div>
                    <h1>Administration Trapeneck</h1>
                    <p>Connectez-vous pour gérer le site</p>
                    <form onSubmit={handleLogin} className={styles.form}>
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.button}>Se connecter</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.adminPanel}>
                <div className={styles.header}>
                    <h1>🍝 Admin Trapeneck</h1>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        Déconnexion
                    </button>
                </div>

                <div className={styles.tabs} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
                    <button
                        onClick={() => setActiveTab('menu')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '2rem',
                            border: 'none',
                            background: activeTab === 'menu' ? '#E31837' : '#f0f0f0',
                            color: activeTab === 'menu' ? 'white' : '#333',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        📋 Menu du Jour
                    </button>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '2rem',
                            border: 'none',
                            background: activeTab === 'gallery' ? '#E31837' : '#f0f0f0',
                            color: activeTab === 'gallery' ? 'white' : '#333',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        🖼️ Gestion Galerie
                    </button>
                </div>

                {activeTab === 'menu' ? (
                    <>
                        <div className={styles.uploadSection}>
                            <h2>📋 Menu de la Semaine</h2>
                            <div className={styles.stepGuide}>
                                <div className={styles.step}>
                                    <span className={styles.stepIcon}>📸</span>
                                    <span className={styles.stepTitle}>1. Photo</span>
                                </div>
                                <div className={styles.step}>
                                    <span className={styles.stepIcon}>📤</span>
                                    <span className={styles.stepTitle}>2. Upload</span>
                                </div>
                                <div className={styles.step}>
                                    <span className={styles.stepIcon}>✨</span>
                                    <span className={styles.stepTitle}>3. Fini !</span>
                                </div>
                            </div>

                            <label className={styles.uploadLabel}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleMenuUpload}
                                    className={styles.fileInput}
                                    disabled={isUploading}
                                />
                                <span className={styles.uploadBtn}>
                                    {isUploading ? `⏳ ${uploadProgress}%` : '📤 Changer le Menu'}
                                </span>
                            </label>

                            {isUploading && (
                                <div className={styles.progressContainer}>
                                    <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }} />
                                </div>
                            )}

                            {error && <div className={styles.errorBox}>❌ {error}</div>}
                            {uploadSuccess && <div className={styles.success}>✅ Menu mis à jour !</div>}
                        </div>

                        <div className={styles.previewSection}>
                            <h3>{localPreviewUrl ? '📤 Aperçu (upload...)' : 'Menu Actuel'}</h3>
                            {localPreviewUrl ? (
                                <img src={localPreviewUrl} className={styles.previewImage} style={{ opacity: 0.8 }} />
                            ) : menuImageUrl ? (
                                <img src={menuImageUrl} className={styles.previewImage} />
                            ) : (
                                <div className={styles.noImage}>Aucun menu</div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className={styles.uploadSection}>
                        <h2>🖼️ Ajouter à la Galerie</h2>

                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                            <label style={{ fontWeight: 600 }}>Catégorie :</label>
                            <select
                                value={galleryCategory}
                                onChange={(e) => setGalleryCategory(e.target.value as 'restaurant' | 'events')}
                                style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ddd', fontSize: '1rem' }}
                            >
                                <option value="restaurant">🍽️ Restaurant & Plats</option>
                                <option value="events">🎉 Événements & Fêtes</option>
                            </select>
                        </div>

                        <label className={styles.uploadLabel}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleGalleryUpload}
                                className={styles.fileInput}
                                disabled={isUploading}
                            />
                            <span className={styles.uploadBtn}>
                                {isUploading ? `⏳ ${uploadProgress}%` : '➕ Ajouter une photo'}
                            </span>
                        </label>

                        {isUploading && (
                            <div className={styles.progressContainer}>
                                <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }} />
                            </div>
                        )}

                        {uploadSuccess && <div className={styles.success}>✅ Photo ajoutée !</div>}

                        <h3 style={{ marginTop: '2rem', textAlign: 'left', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Vos Photos</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                            gap: '1rem',
                            marginTop: '1.5rem'
                        }}>
                            {galleryImages
                                .filter(img => img.category === galleryCategory)
                                .map((img) => (
                                    <div key={img.id} style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', background: '#fff' }}>
                                        <img src={img.url} alt="Gallery" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
                                        <div style={{ padding: '0.5rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa' }}>
                                            <span title={img.category}>
                                                {img.category === 'restaurant' ? '🍽️' : '🎉'}
                                            </span>
                                            <button
                                                onClick={() => handleDeleteGalleryImage(img.id, img.url)}
                                                style={{
                                                    background: '#fee2e2',
                                                    color: '#dc2626',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '4px 8px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                Supr.
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
