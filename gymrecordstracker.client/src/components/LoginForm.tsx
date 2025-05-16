import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Alert, Typography } from "@mui/material";
import FormInput from "./ui-ux/formInput";
import { useUserStore } from "../stores/userStore";

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

/**
 * LoginForm — form for user authentication.
 *
 * @component
 * @returns {JSX.Element} HTML form with Email and Password fields.
 *
 * @example
 * // Valid login
 * {
 *   email: "test@example.com",
 *   password: "123456"
 * }
 */

export default function LoginForm() {
    const { login, loading, error } = useUserStore();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            await login(data);
        } catch {
            setError("email", { message: "Wrong email or password." });
        }
    };

    return (
        <Box
            component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" gutterBottom color="textPrimary">
                Login
            </Typography>

            <FormInput name="email" control={control} label="Email" errors={errors} />
            <FormInput name="password" control={control} label="Password" type="password" errors={errors} />

            {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                Login
            </Button>
        </Box>
    );
}

