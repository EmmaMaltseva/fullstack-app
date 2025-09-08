import express from "express";
import { getAllOrders, updateOrderStatus } from "../controllers/adminControllers";
import { authenticateToken } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

router.use(authenticateToken, requireAdmin);

router.get('/orders', getAllOrders);
router.patch("/orders/:orderId", updateOrderStatus);

export default router;