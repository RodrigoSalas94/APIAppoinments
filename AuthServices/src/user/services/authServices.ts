import { UserRepository } from '../repositories/userRepositories';
import { TokenManagent } from '../../utils/jwtUtils';
import { UserRegister, UserEmail } from '../types/userTypes';
import { hashPassword, comparePassword } from '../../utils/encryptionUtils';
import User from '../models/userModel';

const userRepository = new UserRepository();

export class UserService {
  async registerUser(user: UserRegister): Promise<{ user: UserEmail; token: string }> {
    try {
      const existingUser = await userRepository.findUserByEmail(user.email);
      if (existingUser) {
        throw new Error('El usuario ya existe');
      }

      const hashedPassword = await hashPassword(user.password);

      const newUser = await userRepository.createUser(user.username, user.email, hashedPassword);

      const token = TokenManagent.generateToken(newUser.id);

      const userEmail: UserEmail = {
        email: newUser.email,
      };

      return { user: userEmail, token };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }
  async loginUser(User: UserRegister): Promise<{ user: UserEmail; token: string }> {
    try {
      const user = await userRepository.findUserByEmail(User.email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const passwordMatch = await comparePassword(User.password, user.password);
      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
      }

      const token = TokenManagent.generateToken(user.id);

      const userEmail: UserEmail = {
        email: user.email,
      };

      return { user: userEmail, token };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | null> {
    try {
      const user = await userRepository.findUserById(id);
      if (user) {
        const updatedUser = await userRepository.updateUserByEmail(id, updates);
        return updatedUser;
      }
      return null;
    } catch (error) {
      console.error('Error al actualizar información del usuario:', error);
      throw error;
    }
  }

  async desactivateUser(id: number): Promise<boolean> {
    try {
      const result = await userRepository.desactivateUserByEmail(id);
      return result;
    } catch (error) {
      console.error('Error al desactivar el usuario:', error);
      throw error;
    }
  }

  async reactivateUser(id: number): Promise<boolean> {
    try {
      const result = await userRepository.reactivateUserByEmail(id);
      return result;
    } catch (error) {
      console.error('Error al desactivar el usuario:', error);
      throw error;
    }
  }

  async getCurrentUser(userId: number): Promise<UserEmail | null> {
    try {
      const user = await userRepository.findUserById(userId);
      if (user) {
        const userEmail: UserEmail = {
          email: user.email,
        };
        return userEmail;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener información del usuario actual:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<UserEmail[]> {
    try {
      const users = await userRepository.getAllUsers();
      return users.map((user) => ({ email: user.email }));
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw error;
    }
  }
}
