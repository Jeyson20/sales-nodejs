import { Router } from "express";
import {
    deleteProductById,
    getProductById,
    getProducts,
    getTotalProducts,
    newProduct,
    updateProductById
} from "../controllers/products.controller";
import { verifyToken, isAdmin } from "../middlewares";

const router = Router();

// Products
router.get('/', getProducts);
router.get('/count', getTotalProducts);
router.get('/:id', getProductById);
router.post('/', [verifyToken, isAdmin], newProduct);
router.put('/:id', [verifyToken, isAdmin], updateProductById);
router.delete('/:id', [verifyToken, isAdmin], deleteProductById);

export default router;



