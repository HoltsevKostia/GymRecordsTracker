import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { FavoriteDTO } from "../../interfaces/favoriteInterfaces";
import { useFavoriteStore } from "../../stores/favoriteStore";

/**
 * Component for displaying a single card of favorite content (meme, image, or quote).
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {FavoriteDTO} props.favorite - Favorite content object to render.
 * @returns {JSX.Element} Card with content and delete button.
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
