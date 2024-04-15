import { UserService } from '../services/authServices';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationRequest } from '../types/web/request';

export class UserController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const registerService = new UserService();
      const result = await registerService.registerUser(userData);
      res.status(201).json(result);
    } catch (error) {
      console.error('error al registrar el usuario', error);
      return next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;
      const loginService = new UserService();
      const result = await loginService.loginUser(userData);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return next(error);
    }
  }

  async getCurrentUser(req: AuthenticationRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.id;
      const userService = new UserService();
      const result = await userService.getCurrentUser(userId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al obtener información del usuario actual:', error);
      return next(error);
    }
  }

  async updateUser(req: AuthenticationRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.id;
      const updates = req.body;
      const userService = new UserService();
      const result = await userService.updateUser(userId, updates);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al actualizar información del usuario:', error);
      return next(error);
    }
  }

  async desactivateUser(req: AuthenticationRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.id;
      const userService = new UserService();
      const result = await userService.desactivateUser(userId);
      res.status(200).json({ success: result });
    } catch (error) {
      console.error('Error al desactivar cuenta del usuario:', error);
      return next(error);
    }
  }

  async reactivateUser(req: AuthenticationRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user.id;
      const userService = new UserService();
      const result = await userService.reactivateUser(userId);
      res.status(200).json({ success: result });
    } catch (error) {
      console.error('Error al reactivar cuenta del usuario:', error);
      return next(error);
    }
  }

  async getAllUsers(req: AuthenticationRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService = new UserService();
      const result = await userService.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      return next(error);
    }
  }
}
