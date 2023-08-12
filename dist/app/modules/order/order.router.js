"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const order_controller_1 = require("./order.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', order_controller_1.OrderController.getAllOrder);
router.post('/', order_controller_1.OrderController.createOrder);
router.get('/:id', order_controller_1.OrderController.getSingleOrder);
router.put('/:id', order_controller_1.OrderController.updateOrder);
router.delete('/:id', order_controller_1.OrderController.deleteOrder);
exports.OrderRouter = router;
