import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { FavoriteDTO } from "../../interfaces/favoriteInterfaces";
import { useFavoriteStore } from "../../stores/favoriteStore";

/**
 * Компонент для відображення однієї картки з улюбленим контентом (мем, зображення або цитата).
 *
 * @component
 * @param {Object} props - Властивості компонента.
 * @param {FavoriteDTO} props.favorite - Об'єкт улюбленого контенту, який потрібно відобразити.
 * @returns {JSX.Element} Картка з контентом і кнопкою видалення.
 */
export function FavoriteCard({ favorite }: { favorite: FavoriteDTO }) {
    const { deleteFavorite } = useFavoriteStore();

    const handleDelete = () => {
        deleteFavorite(favorite.id);
    };
    const isImageType = favorite.type === 0 || favorite.type === 1;

    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {isImageType ? (
                <CardMedia
                    component="img"
                    image={favorite.content}
                    alt="Favorite"
                    sx={{ objectFit: "cover" }}
                />
            ) : (
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontStyle="italic">
                        "{favorite.content}"
                    </Typography>
                </CardContent>
            )}

            <CardActions sx={{ justifyContent: "center", mt: "auto" }}>
                <IconButton color="error" onClick={handleDelete}>
                    Delete
                </IconButton>
            </CardActions>
        </Card>
    );
}
