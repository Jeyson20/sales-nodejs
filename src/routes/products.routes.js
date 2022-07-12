import { Router } from "express";
import {
deleteProductById,
getProductById,
getProducts,
getTotalProducts,
newProduct,
updateProductById
} from "../controllers/products.controller";

const router = Router();

// Products
router.get('/api/products', getProducts);
router.get('/api/products/count', getTotalProducts);
router.get('/api/products/:id', getProductById);
router.post('/api/products', newProduct);
router.put('/api/products/:id', updateProductById);
router.delete('/api/products/:id', deleteProductById);

export default router;



