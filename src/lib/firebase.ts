import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, query, orderBy, getDocs, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDjlzF-P8WlBtXNKtqla-mZfEaaJEUtqgQ",
    authDomain: "am-trapeneck-8844.firebaseapp.com",
    projectId: "am-trapeneck-8844",
    storageBucket: "am-trapeneck-8844.firebasestorage.app",
    messagingSenderId: "705979337257",
    appId: "1:705979337257:web:1814be4ec3a42d483c6a38"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// UNIQUE STORAGE KEYS FOR TRAPENECK TO AVOID CONFLICTS
const STORAGE_KEY = 'trapeneck_menu_url';

// Sauvegarder l'URL du menu (Firebase + localStorage backup)
export async function saveMenuUrl(url: string): Promise<{ success: boolean; error?: string }> {
    // Backup en localStorage
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                imageUrl: url,
                updatedAt: new Date().toISOString()
            }));
        }
    } catch (e) {
        console.warn('localStorage non disponible');
    }

    // Sauvegarder dans Firebase - UTILISATION DE 'settings/trapeneck_menu'
    try {
        await setDoc(doc(db, 'settings', 'trapeneck_menu'), {
            imageUrl: url,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error: any) {
        console.error('Erreur Firebase:', error);
        return { success: false, error: error.message || 'Erreur Firebase' };
    }
}

// Charger l'URL du menu (Firebase prioritaire, localStorage fallback)
export async function getMenuUrl(): Promise<string | null> {
    // Essayer Firebase d'abord - UTILISATION DE 'settings/trapeneck_menu'
    try {
        const docSnap = await getDoc(doc(db, 'settings', 'trapeneck_menu'));
        if (docSnap.exists()) {
            return docSnap.data().imageUrl;
        }
    } catch (error) {
        console.warn('Firebase non disponible, utilisation du localStorage');
    }

    // Fallback sur localStorage
    try {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem(STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                return parsed.imageUrl;
            }
        }
    } catch (e) {
        console.warn('localStorage non disponible');
    }

    return null;
}

// Types pour la galerie
export interface GalleryImage {
    id: string;
    url: string;
    category: 'restaurant' | 'events';
    createdAt: string;
}

// Ajouter une image à la galerie - UTILISATION DE LA COLLECTION 'trapeneck_gallery'
export async function addGalleryImage(url: string, category: 'restaurant' | 'events'): Promise<{ success: boolean; error?: string }> {
    try {
        const docRef = doc(collection(db, 'trapeneck_gallery'));
        await setDoc(docRef, {
            url,
            category,
            createdAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error: any) {
        console.error('Erreur ajout galerie:', error);
        return { success: false, error: error.message || 'Erreur inconnue' };
    }
}

// Récupérer toutes les images de la galerie - UTILISATION DE LA COLLECTION 'trapeneck_gallery'
export async function getGalleryImages(): Promise<GalleryImage[]> {
    try {
        const q = query(collection(db, 'trapeneck_gallery'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as GalleryImage));
    } catch (error) {
        console.error('Erreur lecture galerie:', error);
        return [];
    }
}

// Supprimer une image de la galerie
export async function deleteGalleryImage(id: string, imageUrl?: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Supprimer du Firestore
        await deleteDoc(doc(db, 'trapeneck_gallery', id));

        // Supprimer du Storage si l'URL est fournie et appartient à notre bucket
        if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
            try {
                const storageRef = ref(storage, imageUrl);
                await deleteObject(storageRef);
            } catch (storageError) {
                console.warn('Erreur suppression Storage:', storageError);
                // On continue car le document Firestore est déjà supprimé
            }
        }

        return { success: true };
    } catch (error: any) {
        console.error('Erreur suppression galerie:', error);
        return { success: false, error: error.message || 'Erreur inconnue' };
    }
}

// Fonction d'upload d'image vers Firebase Storage avec suivi de progression
export async function uploadImage(
    file: File, 
    folder: 'menu' | 'gallery', 
    onProgress?: (percent: number) => void
): Promise<string | null> {
    return new Promise((resolve, reject) => {
        try {
            const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const storageRef = ref(storage, `${folder}/${fileName}`);
            
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (onProgress) onProgress(progress);
                }, 
                (error) => {
                    console.error('Erreur Upload Firebase Storage:', error);
                    resolve(null); // On résout avec null pour gérer l'erreur gracieusement dans l'UI
                }, 
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    } catch (urlError) {
                        console.error('Erreur récupération URL:', urlError);
                        resolve(null);
                    }
                }
            );
        } catch (error) {
            console.error('Erreur technique Upload:', error);
            resolve(null);
        }
    });
}
