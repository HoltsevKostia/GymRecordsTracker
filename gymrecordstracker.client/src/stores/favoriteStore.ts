import { create } from 'zustand';
import { favoriteApi } from '../api/favoriteApi';
import { FavoriteDTO, AddFavoriteDTO } from '../interfaces/favoriteInterfaces';

interface FavoriteState {
    favorites: FavoriteDTO[];
    loading: boolean;
    error: string | null;
    getAllFavorites: () => Promise<void>;
    getFavoriteById: (id: number) => Promise<FavoriteDTO | null>;
    addFavorite: (favorite: AddFavoriteDTO) => Promise<void>;
    deleteFavorite: (id: number) => Promise<void>;
    setFavorites: (favorites: FavoriteDTO[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
    favorites: [],
    loading: false,
    error: null,

    getAllFavorites: async () => {
        set({ loading: true });
        try {
            const data = await favoriteApi.getAllUsersFavorites();
            set({ favorites: data, error: null });
        } catch (error) {
            set({ favorites: [], error: "Could not fetch favorites" });
        } finally {
            set({ loading: false });
        }
    },

    getFavoriteById: async (id) => {
        try {
            const favorite = await favoriteApi.getFavoriteById(id);
            return favorite;
        } catch (error) {
            set({ error: "Favorite not found" });
            return null;
        }
    },

    addFavorite: async (favorite) => {
        try {
            set({ loading: true });
            const result = await favoriteApi.addFavorite(favorite);
            if (result.success) {
                await get().getAllFavorites();
            } else {
                set({ error: result.message });
            }
        } catch (error) {
            set({ error: "Failed to add favorite" });
        } finally {
            set({ loading: false });
        }
    },

    deleteFavorite: async (id) => {
        try {
            set({ loading: true });
            const result = await favoriteApi.deleteFavoriteById(id);
            if (result.success) {
                set({ favorites: get().favorites.filter(f => f.id !== id) });
            } else {
                set({ error: result.message });
            }
        } catch (error) {
            set({ error: "Failed to delete favorite" });
        } finally {
            set({ loading: false });
        }
    },

    setFavorites: (favorites) => set({ favorites }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
