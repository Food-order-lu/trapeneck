'use client';

import { useEffect, useState } from 'react';
import {
    getPublications,
    addPublication,
    deletePublication,
    uploadImage,
    type Publication,
} from '@/lib/firebase';
import { resizeImage } from '@/lib/image';
import styles from '@/app/admin/page.module.css';

export default function PublicationsAdmin() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [title, setTitle] = useState('');
    const [dateLabel, setDateLabel] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getPublications().then(setPublications);
    }, []);

    const reset = () => {
        setTitle('');
        setDateLabel('');
        setDescription('');
        setImageFile(null);
        setUploadProgress(0);
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!title.trim() || !dateLabel.trim() || !imageFile) {
            setError('Titre, date et image sont obligatoires.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(10);

        try {
            const compressedBlob = await resizeImage(imageFile);
            const compressedFile = new File([compressedBlob], imageFile.name, { type: imageFile.type });
            setUploadProgress(30);

            const imageUrl = await uploadImage(compressedFile, 'publications', (p) => {
                setUploadProgress(Math.round(30 + p * 0.6));
            });

            if (!imageUrl) {
                setError('Erreur upload Firebase Storage.');
                return;
            }

            const result = await addPublication({
                title: title.trim(),
                dateLabel: dateLabel.trim(),
                description: description.trim(),
                imageUrl,
            });

            if (result.success) {
                setUploadProgress(100);
                setSuccess(true);
                reset();
                const fresh = await getPublications();
                setPublications(fresh);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(`Erreur sauvegarde: ${result.error}`);
            }
        } catch (err) {
            console.error(err);
            setError('Erreur technique. Réessayez.');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleDelete = async (pub: Publication) => {
        if (!confirm(`Supprimer la publication "${pub.title}" ?`)) return;
        const result = await deletePublication(pub.id, pub.imageUrl);
        if (result.success) {
            const fresh = await getPublications();
            setPublications(fresh);
        } else {
            alert('Erreur: ' + result.error);
        }
    };

    return (
        <div className={styles.uploadSection}>
            <h2>📰 Publications &amp; Événements</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Publications visibles sur la page d&apos;accueil du site, sous le Menu du Jour.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Titre *</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Soirée Tarantella"
                        disabled={isUploading}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ddd', fontSize: '1rem' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Date / Période *</span>
                    <input
                        type="text"
                        value={dateLabel}
                        onChange={(e) => setDateLabel(e.target.value)}
                        placeholder="Samedi 21 juin 2026 — ou — du 14 au 21 juillet"
                        disabled={isUploading}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ddd', fontSize: '1rem' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Description</span>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Soirée italienne avec dégustation de vins. Réservation conseillée."
                        rows={3}
                        disabled={isUploading}
                        style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ddd', fontSize: '1rem', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <span style={{ fontWeight: 600 }}>Image / Visuel *</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                        disabled={isUploading}
                        style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #ddd', fontSize: '0.95rem' }}
                    />
                    {imageFile && (
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>
                            📎 {imageFile.name}
                        </span>
                    )}
                </label>

                <button
                    type="submit"
                    disabled={isUploading}
                    className={styles.uploadBtn}
                    style={{ alignSelf: 'center', cursor: isUploading ? 'not-allowed' : 'pointer', opacity: isUploading ? 0.6 : 1 }}
                >
                    {isUploading ? `⏳ Publication... ${uploadProgress}%` : '➕ Publier'}
                </button>

                {isUploading && (
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }} />
                    </div>
                )}

                {error && <div className={styles.errorBox}>❌ {error}</div>}
                {success && <div className={styles.success}>✅ Publication ajoutée !</div>}
            </form>

            <h3 style={{ marginTop: '2.5rem', textAlign: 'left', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                Publications existantes ({publications.length})
            </h3>

            {publications.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888', marginTop: '1.5rem' }}>
                    Aucune publication pour l&apos;instant.
                </p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginTop: '1.5rem',
                }}>
                    {publications.map((pub) => (
                        <div key={pub.id} style={{ background: '#fff', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                            <img src={pub.imageUrl} alt={pub.title} style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover' }} />
                            <div style={{ padding: '0.75rem', textAlign: 'left' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{pub.title}</div>
                                <div style={{ fontSize: '0.8rem', color: '#FF6B35', fontWeight: 600 }}>{pub.dateLabel}</div>
                                {pub.description && (
                                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.35rem' }}>{pub.description}</div>
                                )}
                                <button
                                    onClick={() => handleDelete(pub)}
                                    style={{
                                        marginTop: '0.5rem',
                                        background: '#fee2e2',
                                        color: '#dc2626',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '4px 10px',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    🗑️ Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
