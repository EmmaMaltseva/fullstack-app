import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Это защищённый маршрут!", userId: (req as any).userId });
});

export default router;
