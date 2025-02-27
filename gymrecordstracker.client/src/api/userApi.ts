import api from './axiosInstance';
import { AddUserDTO, LoginUserDTO, UserDTO } from '../interfaces/userInterfaces';

export const userApi = {
    async registerUser(user: AddUserDTO): Promise<UserDTO> {
        const { data } = await api.post("/user/register", user);
        return data;
    },

    async loginUser(user: LoginUserDTO): Promise<UserDTO> {
        const { data } = await api.post("/user/login", user);
        return data;
    },

    async logoutUser(): Promise<{ success: boolean; message: string }> {
        const { data } = await api.post("/user/logout");
        return data;
    },

    async getUser(): Promise<UserDTO> {
        const { data } = await api.get("/user/profile");
        return data;
    }
}