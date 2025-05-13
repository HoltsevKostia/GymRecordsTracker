import { Container, Box, Typography, Button, CircularProgress, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useState } from "react";


export default function ProfilePage() {
    const { user, logout, loading, updateUserEmail, deleteUser ,error } = useUserStore();
    const navigate = useNavigate();

    const handlelogout = () => {
        logout();
        navigate("/auth");
    };

    const [newEmail, setNewEmail] = useState(user?.email || "");
    const [emailUpdated, setEmailUpdated] = useState(false);

    const handleEmailUpdate = async () => {
        if (!user) return;
        setEmailUpdated(false);
        await updateUserEmail({ id: user.id, email: newEmail });
        if (!error) {
            setEmailUpdated(true);
        }
    };

    const handleDeleteAccount = async () => {
        const confirm = window.confirm("Are you sure you want to delete your account? This action is irreversible.");
        if (confirm) {
            await deleteUser();
            navigate("/auth");
        }
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

                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    error={!!error}
                    helperText={error || ""}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={handleEmailUpdate}
                >
                    Update Email
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleDeleteAccount}
                >
                    Delete Account
                </Button>

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

