import { Link, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";

/**
 * Layout — головний макет сайту з хедером і навігацією.
 * Виводить children через <Outlet /> в межах контейнера.
 *
 * @returns {JSX.Element} Базовий шаблон з AppBar і внутрішнім контентом.
 */

export default function Layout() {
    const { user } = useUserStore();

    return (
        <div className="layout">
            {/* Header */}
            <AppBar position="sticky" className="header">
                <Toolbar className="toolbar">
                    <Typography variant="h6" className="logo">
                        My Vibe
                    </Typography>
                    <Box className="nav-buttons">
                        <Button color="inherit" component={Link} to="/" sx={{ color: "white", "&:hover": { color: "white", bgcolor: "#242424" },}}>
                            Main
                        </Button>
                        {user && (
                            <Button color="inherit" component={Link} to="/profile" sx={{ color: "white", "&:hover": { color: "white", bgcolor: "#242424" }, }}>
                                Profile
                            </Button>
                            )}
                        </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <main className="main-content">
                <Container maxWidth="sm">
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}
