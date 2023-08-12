import express from 'express';
import { ProductController } from './product.controller';
const router = express.Router();

router.get('/', ProductController.getAllProduct);
router.post('/', ProductController.createProduct);
router.get('/:id', ProductController.getSingleProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export const ProductRouter = router;
