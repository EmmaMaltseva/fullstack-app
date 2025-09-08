import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: string;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Нет токена авторизации" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { 
      userId: number;
      role: string; 
    };

    req.userId = decoded.userId;
    req.userRole = decoded.role

    next();
  } catch (err) {
    return res.status(403).json({ error: "Невалидный токен" });
  }
};
