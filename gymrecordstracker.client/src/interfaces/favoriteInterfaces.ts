/**
 * FavoriteDTO — full data structure representing a user's favorite item.
 *
 * @typedef {Object} FavoriteDTO
 * @property {number} id - Unique identifier
 * @property {number} userId - ID of the user who added the favorite
 * @property {number} type - Favorite type (0 = Image, 1 = Meme, 2 = Quote)
 * @property {string} content - The content or URL
 */

/**
 * AddFavoriteDTO — structure for adding a new favorite.
 *
 * @typedef {Object} AddFavoriteDTO
 * @property {number} type - Favorite type (0 = Image, 1 = Meme, 2 = Quote)
 * @property {string} content - The content or URL
 */

export interface FavoriteDTO {
    id: number;
    userId: number;
    type: number;
    content: string;
}

export interface AddFavoriteDTO {
    type: number;
    content: string;
}