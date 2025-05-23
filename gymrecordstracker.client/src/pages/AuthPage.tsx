import { useState } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

/**
 * AuthPage � page for user login and registration.
 * Toggles between LoginForm and RegisterForm based on state.
 *
 * @returns {JSX.Element} Page with login and registration forms.
 */

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, p:3, borderRadius: 2, boxShadow: 3, textAlign: "center", bgcolor: "whitesmoke" }}>
                {isLogin ? <LoginForm /> : <RegisterForm />}
                <Typography variant="body2" color="textPrimary" sx={{ mt: 2 }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Register" : "Login"}
                    </Button>
                </Typography>
            </Box>
        </Container>
    );
}
