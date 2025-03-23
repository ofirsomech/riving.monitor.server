import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('x-auth-token');

  if (!token) {
    // Throw an error instead of returning a response
    return next(new Error('No token, authorization denied'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = (decoded as any).user;
    next();
  } catch (err) {
    return next(new Error('Token is not valid'));
  }
};

export default authMiddleware;
