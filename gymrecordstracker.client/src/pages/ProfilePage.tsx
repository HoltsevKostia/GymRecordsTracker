import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

export default function ProfilePage() {
    const { user, logout } = useUserStore();
    const navigate = useNavigate();

    const handlelogout = () => {
        logout();
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
                    onClick={handlelogout}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
}

