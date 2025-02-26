import { Container, Box, Typography, Button } from "@mui/material";
import { useUserStore } from "../stores/userStore";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const user = useUserStore((state) => state.user);
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate("/auth");
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 4, borderRadius: 2, boxShadow: 3, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Profile
                </Typography>
                <Typography variant="h6">Username: {user?.username}</Typography>
                <Typography variant="h6">Email: {user?.email}</Typography>

                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={logout}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
}

