import { Response, NextFunction } from 'express';
import { AuthenticationRequest } from '../user/types/web/request';
import { TokenManagent } from '../utils/jwtUtils';

export const authenticateToken = async (req: AuthenticationRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    const decodedToken = await TokenManagent.verifyToken(token);
    if (!decodedToken || !decodedToken.id) {
      return res.status(403).json({ message: 'Token de autenticación inválido' });
    }

    req.user = { id: decodedToken.id };

    return res.status(200).json({
      message: 'Token de autenticación verificado correctamente',
      id: decodedToken.id, // Aquí corregimos para usar el ID del token decodificado
    });
  } catch (error) {
    console.error('Error en la verificación del token:', error);
    return res.status(500).json({ message: 'Error en la verificación del token' });
  }
};
