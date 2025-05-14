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