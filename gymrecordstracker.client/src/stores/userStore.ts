import { create } from 'zustand';
import { userApi } from '../api/userApi';
import { UserDTO, LoginUserDTO, AddUserDTO, UpdateUserEmailDTO } from '../interfaces/userInterfaces';

interface UserState {
    user: UserDTO | null;
    loading: boolean;
    error: string | null;
    getUser: () => Promise<void>;
    login: (credentials: LoginUserDTO) => Promise<void>;
    register: (user: AddUserDTO) => Promise<void>;
    updateUserEmail: (credentials: UpdateUserEmailDTO) => Promise<void>;
    logout: () => Promise<void>;
    deleteUser: () => Promise<void>;
    setUser: (user: UserDTO | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}

/**
 * useUserStore — Zustand store for user authentication and profile management.
 * Includes login, registration, email update, logout, and account deletion logic.
 *
 * @module useUserStore
 */


export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: true,
    error: null,

    getUser: async () => {
        set({ loading: true });
        try {         
            const userData = await userApi.getUser();
            set({ user: userData });
        } catch (error) {
            set({ user: null, error: "You need to authorize" });
        } finally {
            set({ loading: false });
        }
    },

    login: async (credentials) => {     
        try {
            set({ loading: true });
            const userData = await userApi.loginUser(credentials);
            set({ user: userData, error: null });
        } catch (error) {
            set({ user: null, error: "Wrong email or password" });
        } finally {
            set({ loading: false });
        }
    },

    register: async (user) => {    
        try {
            set({ loading: true });
            const userData = await userApi.registerUser(user);
            set({ user: userData, error: null });
        } catch (error) {
            set({ user: null, error: "Email or username is already taken" });
        } finally {
            set({ loading: false });
        }
    },

    updateUserEmail: async (credentials) => {
        try {
            set({ loading: true });
            const result = await userApi.updateUserEmail(credentials);

            if (result.success) {
                const userData = await userApi.getUser();
                set({ user: userData, error: null });
            } else {
                set({ error: "Email update failed" });
            }
        } catch (error) {
            set({ error: "Wrong or taken email" });
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        try {
            set({ loading: true});
            await userApi.logoutUser();
            set({ user: null });
        } catch (error) {
            set({ error: "Loguot error" });
        } finally {
            set({ loading: false });
        }
    },

    deleteUser: async () => {
        try {
            set({ loading: true });
            await userApi.deleteUser();
            set({ user: null });
        } catch (error) {
            set({ error: "Account deleting error" });
        } finally {
            set({ loading: false });
        }
    },

    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
