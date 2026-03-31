import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://obkxjbljiadirvgadfwj.supabase.co';
const supabaseKey = 'sb_publishable_2gPSSJ0iwvm5CiXL03VKCQ_m4EJ7HlJ';

export const supabase = createClient(supabaseUrl, supabaseKey);

// RESTAURANT ID FOR TRAPENECK
const RESTAURANT_ID = 'trapeneck';

// Types pour la galerie
export interface GalleryImage {
    id: string;
    url: string;
    category: 'restaurant' | 'events';
    createdAt: string;
}

// Sauvegarder l'URL du menu
export async function saveMenuUrl(url: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('site_config')
            .upsert({ 
                key: 'weekly_menu', 
                value: url, 
                restaurant_id: RESTAURANT_ID,
                updated_at: new Date().toISOString()
            }, { 
                onConflict: 'key,restaurant_id' 
            });

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        console.error('Erreur Supabase Menu:', error);
        return { success: false, error: error.message };
    }
}

// Récupérer l'URL du menu
export async function getMenuUrl(): Promise<string | null> {
    try {
        const { data, error } = await supabase
            .from('site_config')
            .select('value')
            .eq('key', 'weekly_menu')
            .eq('restaurant_id', RESTAURANT_ID)
            .maybeSingle();

        if (error) throw error;
        return data?.value || null;
    } catch (error) {
        console.warn('Erreur Supabase Menu read:', error);
        return null;
    }
}

// Ajouter une image à la galerie
export async function addGalleryImage(url: string, category: 'restaurant' | 'events'): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('gallery_images')
            .insert({
                url,
                category,
                restaurant_id: RESTAURANT_ID,
                created_at: new Date().toISOString()
            });

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        console.error('Erreur Supabase Gallery add:', error);
        return { success: false, error: error.message };
    }
}

// Récupérer toutes les images de la galerie
export async function getGalleryImages(): Promise<GalleryImage[]> {
    try {
        const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .eq('restaurant_id', RESTAURANT_ID)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data.map((img: any) => ({
            id: img.id,
            url: img.url,
            category: img.category === 'plats' ? 'restaurant' : img.category, // Bridge the old category names
            createdAt: img.created_at
        })) as GalleryImage[];
    } catch (error) {
        console.error('Erreur Supabase Gallery read:', error);
        return [];
    }
}

// Supprimer une image de la galerie
export async function deleteGalleryImage(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from('gallery_images')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { success: true };
    } catch (error: any) {
        console.error('Erreur Supabase Gallery delete:', error);
        return { success: false, error: error.message };
    }
}

// Fonction pour uploader sur Supabase Storage (optionnel si on continue avec Cloudinary)
export async function uploadImage(file: File, bucket: string = 'gallery'): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${RESTAURANT_ID}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

        return data.publicUrl;
    } catch (error) {
        console.error('Erreur upload Supabase:', error);
        return null;
    }
}
