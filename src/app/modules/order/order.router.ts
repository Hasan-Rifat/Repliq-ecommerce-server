import { OrderController } from './order.controller';
import express from 'express';
const router = express.Router();

router.get('/', OrderController.getAllOrder);
router.post('/', OrderController.createOrder);
router.get('/:id', OrderController.getSingleOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

export const OrderRouter = router;
