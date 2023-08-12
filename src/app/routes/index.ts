import express from 'express';
import { userRouter } from '../modules/user/user.router';
import { ProductRouter } from '../modules/product/product.router';
import { OrderRouter } from '../modules/order/order.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/product',
    route: ProductRouter,
  },
  {
    path: '/order',
    route: OrderRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
