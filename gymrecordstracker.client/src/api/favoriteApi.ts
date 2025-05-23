import api from './axiosInstance';
import { FavoriteDTO, AddFavoriteDTO } from '../interfaces/favoriteInterfaces';

/**
 * favoriteApi � client for managing user's favorite content via HTTP.
 * Provides methods to fetch, add, and delete favorite items.
 *
 * @module favoriteApi
 */


export const favoriteApi = {

    async getAllUsersFavorites(): Promise<FavoriteDTO[]> {
        const { data } = await api.get("/favorite/all");
        return data;
    },

    async getFavoriteById(id: number): Promise<FavoriteDTO> {
        const { data } = await api.get(`/favorite/${id}`);
        return data;
    },

    async addFavorite(favorite: AddFavoriteDTO): Promise<{ success: boolean; message: string }> {
        const { data } = await api.post(`/favorite/add`, favorite);
        return data;
    },

    async deleteFavoriteById(id: number): Promise<{ success: boolean; message: string }> {
        const { data } = await api.delete(`/favorite/delete/${id}`);
        return data;
    }
}