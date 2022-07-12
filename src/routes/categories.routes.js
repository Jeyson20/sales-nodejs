import { Router } from "express";
import {deleteCategoryById, getCategories, getCategoryById, newCategory} from '../controllers/categories.controller'

const router = Router();

//routes
router.get('/api/categories', getCategories);
router.get('/api/categories/:id', getCategoryById);
router.post('/api/categories', newCategory);
router.delete('/api/categories/:id', deleteCategoryById);

export default router;