import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Alert, Typography } from "@mui/material";
import FormInput from "./ui-ux/formInput";
import { useAuth } from "../hooks/useAuth";
import React from "react";


const registerSchema = yup.object().shape({
    username: yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function RegisterForm() {
    const { handleRegister, loading } = useAuth();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            await handleRegister(data);
        } catch {
            setError("root", { message: "Registration failed. The email may already be in use." });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" gutterBottom>
                Register
            </Typography>

            <FormInput name="username" control={control} label="Username" errors={errors} />
            <FormInput name="email" control={control} label="Email" errors={errors} />
            <FormInput name="password" control={control} label="Password" type="password" errors={errors} />

            {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                Register
            </Button>
        </Box>
    );
}

