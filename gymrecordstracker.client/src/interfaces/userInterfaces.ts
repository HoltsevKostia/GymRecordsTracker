/**
 * UserDTO — structure representing a registered user.
 *
 * @typedef {Object} UserDTO
 * @property {number} id - User ID
 * @property {string} email - User email
 * @property {string} username - Chosen username
 * @property {string} password - Hashed password
 */

/**
 * AddUserDTO — structure used during user registration.
 *
 * @typedef {Object} AddUserDTO
 * @property {string} email - User email
 * @property {string} username - Chosen username
 * @property {string} password - Plain password (to be hashed)
 * @property {string} createdAt - Timestamp of registration
 */

/**
 * LoginUserDTO — structure used for user login.
 *
 * @typedef {Object} LoginUserDTO
 * @property {string} email - Email used for login
 * @property {string} password - Password
 */

/**
 * UpdateUserEmailDTO — structure for email update requests.
 *
 * @typedef {Object} UpdateUserEmailDTO
 * @property {number} id - User ID
 * @property {string} email - New email address
 */

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
