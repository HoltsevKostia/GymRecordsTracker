import { useEffect } from "react";
import { Box, Container, Grid, Typography, CircularProgress, } from "@mui/material";

import AddFavoriteForm from "../components/AddFavoriteForm";
import { useFavoriteStore } from "../stores/favoriteStore";
import { FavoriteCard } from "../components/ui-ux/favoriteCard";

/**
 * HomePage Ч the main application page.
 * Contains a form for adding favorite content and a gallery of saved items.
 *
 * @returns {JSX.Element} Page with a form and a card grid.
 */

export default function HomePage() {
    const { favorites, getAllFavorites, loading } = useFavoriteStore();

    useEffect(() => {
        getAllFavorites();
    }, [getAllFavorites]);

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>
            {/* ‘орма додаванн€ улюбленого */}
            <AddFavoriteForm />

            {/* √алере€ */}
            <Box sx={{ mt: 6 }}>
                <Typography variant="h5" gutterBottom textAlign="center">
                    My Favorites
                </Typography>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {favorites.map((fav) => (
                            <Grid item xs={12} sm={6} md={4} key={fav.id}>
                                <FavoriteCard favorite={fav} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
}



