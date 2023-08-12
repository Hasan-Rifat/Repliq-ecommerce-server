"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/user/user.router");
const product_router_1 = require("../modules/product/product.router");
const order_router_1 = require("../modules/order/order.router");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_router_1.userRouter,
    },
    {
        path: '/product',
        route: product_router_1.ProductRouter,
    },
    {
        path: '/order',
        route: order_router_1.OrderRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
