import express from "express";
import { getUserOrders, createOrder } from "../controllers/orderController";
import { authenticateToken } from "../middleware/authMiddleware";
const router = express.Router();

router.get('/:userId', authenticateToken, getUserOrders);
router.post('/', authenticateToken, createOrder);

export default router;