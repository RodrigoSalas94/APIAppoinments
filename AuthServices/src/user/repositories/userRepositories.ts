import User from '../models/userModel';

export class UserRepository {
  async createUser(username: string, email: string, password: string): Promise<User> {
    try {
      return await User.create({ username, email, password });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw error;
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw error;
    }
  }

  async updateUserByEmail(id: number, updates: Partial<User>): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { id } });
      if (user) {
        await user.update(updates);
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  async desactivateUserByEmail(id: number): Promise<boolean> {
    try {
      const user = await User.findOne({ where: { id } });
      if (user) {
        user.isActive = false;
        await user.save();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      throw error;
    }
  }

  async reactivateUserByEmail(id: number): Promise<boolean> {
    try {
      const user = await User.findOne({ where: { id } });
      if (user) {
        user.isActive = true;
        await user.save();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al reactivar usuario:', error);
      throw error;
    }
  }
}
