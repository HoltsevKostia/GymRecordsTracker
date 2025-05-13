export interface UserDTO {
    id: number;
    email: string;
    username: string;
    password: string;
}

export interface AddUserDTO {
    email: string;
    username: string;
    password: string;
    createdAt: string;
}

export interface LoginUserDTO {
    email: string;
    password: string;
}

export interface UpdateUserEmailDTO {
    id: number;
    email: string;
}
