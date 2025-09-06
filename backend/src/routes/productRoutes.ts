import express from "express";
import { getAllProducts, getProductById, createProduct } from "../controllers/productController";

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // TODO: ограничить только админам

export default router;