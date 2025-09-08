import express from "express";
import { getAllProducts, getProductById, createProduct } from "../controllers/productController";
import { authenticateToken } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/requireAdmin";

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, requireAdmin, createProduct); // TODO: ограничить только админам

export default router;