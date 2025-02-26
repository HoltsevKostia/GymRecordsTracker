import { useCallback, useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import { LoginUserDTO, AddUserDTO } from "../interfaces/userInterfaces";

export const useAuth = () => {
    const { user, loading, error, getUser, login, register, logout } = useUserStore();

    const loadUser = useCallback(getUser, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const handleLogin = async (credentials: LoginUserDTO) => {
        await login(credentials);
    };

    const handleRegister = async (userData: AddUserDTO) => {
        await register(userData);
    };

    const handleLogout = async () => {
        await logout();
    };

    return { user, loading, error, handleLogin, handleRegister, handleLogout, isAuthenticated: !!user };
};

