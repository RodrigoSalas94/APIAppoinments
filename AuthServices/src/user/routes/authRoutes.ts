import express from 'express';
import { authenticateToken } from '../../middleware/authMiddleware';

const authRoutes = express.Router();

authRoutes.post('/auth', authenticateToken);

export default authRoutes;
