import User from '../models/userModel';

export type UserEmail = Pick<User, 'email'>;
export type UserRegister = Pick<User, 'email' | 'password' | 'username'>;
