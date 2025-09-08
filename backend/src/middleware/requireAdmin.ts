import { NextFunction, Response } from "express";
import { AuthRequest } from "./authMiddleware";

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Только для администраторов" })
  }
  next();
}