import { create } from 'zustand';
import { userApi } from '../api/userApi';
import { UserDTO, LoginUserDTO, AddUserDTO } from '../interfaces/userInterfaces';

interface UserState {
    user: UserDTO | null;
    loading: boolean;
    error: string | null;
    getUser: () => Promise<void>;
    login: (credentials: LoginUserDTO) => Promise<void>;
    register: (user: AddUserDTO) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: UserDTO | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    loading: false,
    error: null,

    getUser: async () => {
        set({ loading: true, error: null });
        try {
            const userData = await userApi.getProfile();
            set({ user: userData });
        } catch (error) {
            set({ user: null });
        } finally {
            set({ loading: false });
        }
    },

    login: async (credentials) => {
        set({ loading: true, error: null });
        try {
            const userData = await userApi.loginUser(credentials);
            set({ user: userData });
        } catch (error) {
            set({ error: "Wrong email or password" });
        } finally {
            set({ loading: false });
        }
    },

    register: async (user) => {
        set({ loading: true, error: null });
        try {
            const newUser = await userApi.registerUser(user);
            set({ user: newUser });
        } catch (error) {
            set({ error: "Email or username is already taken" });
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            await userApi.logoutUser();
            set({ user: null });
        } catch (error) {
            set({ error: "Loguot error" });
        } finally {
            set({ loading: false });
        }
    },

    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
