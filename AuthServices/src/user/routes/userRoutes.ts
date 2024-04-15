import express from 'express';
import { UserController } from '../controllers/userControllers';
import { authenticateToken } from '../../middleware/authMiddleware';

const userRoutes = express.Router();
const userControllers = new UserController();

userRoutes.post('/register', userControllers.register);
userRoutes.post('/login', userControllers.login);
userRoutes.get('/users', authenticateToken, userControllers.getCurrentUser);
userRoutes.get('/users/getall', authenticateToken, userControllers.getAllUsers);
userRoutes.put('/users/update', authenticateToken, userControllers.updateUser);
userRoutes.put('/users/desactivate', authenticateToken, userControllers.desactivateUser);
userRoutes.put('/users/reactivate', authenticateToken, userControllers.reactivateUser);
userRoutes.get('/auth/verify-token', authenticateToken);

export default userRoutes;
