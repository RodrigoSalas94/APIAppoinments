import { ErrorRequestHandler } from 'express';

export class ErrorHTTP extends Error {
  constructor(
    public status: number,
    message: string | { message: string }
  ) {
    const msg = typeof message === 'string' ? message : message.message;
    super(msg);
  }
}

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error.status === 401) {
    return res.status(401).json({ error: 'Unauthorized: Invalid credentials' });
  } else if (error.status === 403) {
    return res.status(403).json({ error: 'Forbidden: Access denied' });
  } else if (error.status === 404) {
    return res.status(404).json({ error: 'Resource not found' });
  } else {
    console.error('Error en la aplicación:', error);
    return res.status(error.status || 500).json({ error: error.message || 'Server error' });
  }
};
