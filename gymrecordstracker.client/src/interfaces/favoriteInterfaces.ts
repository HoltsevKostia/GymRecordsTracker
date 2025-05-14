export interface FavoriteDTO {
    id: number;
    userId: number;
    type: number;
    content: string;
}

export interface AddFavoriteDTO {
    userId: number;
    type: number;
    content: string;
    createdAt: string;
}