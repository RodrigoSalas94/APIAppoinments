import { Response, NextFunction } from 'express';
import { AuthenticationRequest } from '../patients/types/web/request';
import axios from 'axios';

export async function authenticateToken(req: AuthenticationRequest, res: Response, next: NextFunction) {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    const response = await axios.post(`http://localhost:1234/auth`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      return res.status(403).json({ message: 'Token de autenticación inválido' });
    }

    const userId = response.data.id;

    req.user = { id: userId };

    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(500).json({ message: 'Error en la verificación del token' });
  }
}
