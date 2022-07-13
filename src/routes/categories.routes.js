import { Router } from "express";
import {deleteCategoryById, getCategories, getCategoryById, newCategory} from '../controllers/categories.controller'

const router = Router();

//routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', newCategory);
router.delete('/:id', deleteCategoryById);

export default router;