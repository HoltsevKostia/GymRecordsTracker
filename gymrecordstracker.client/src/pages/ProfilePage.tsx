import { Container, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";


export default function ProfilePage() {
    const { user, logout, loading } = useUserStore();
    const navigate = useNavigate();

    const handlelogout = () => {
        logout();
        navigate("/auth");
    };

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 4, borderRadius: 2, boxShadow: 3, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
                <Typography variant="h6" textAlign="start">Username: {user?.username}</Typography>
                <Typography variant="h6" textAlign="start">Email: {user?.email}</Typography>

                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handlelogout}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
}

