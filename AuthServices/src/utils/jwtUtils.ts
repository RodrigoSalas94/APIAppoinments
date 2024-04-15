import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/env';

export class TokenManagent {
  private static readonly _secretKey = env.SECRET_KEY;
  public static get secretKey() {
    return TokenManagent._secretKey;
  }

  static generateToken(id: number): string {
    return jwt.sign({ id }, TokenManagent.secretKey, { expiresIn: '1h' });
  }

  static verifyToken(token: string): JwtPayload | null {
    try {
      const decodedToken = jwt.verify(token, TokenManagent.secretKey) as JwtPayload;
      return decodedToken;
    } catch (error) {
      console.error('Error al verificar el Token:', error);
      return null;
    }
  }
}
