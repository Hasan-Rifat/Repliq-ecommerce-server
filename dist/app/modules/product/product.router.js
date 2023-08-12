"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const multer_1 = __importDefault(require("../../../middleware/multer"));
const router = express_1.default.Router();
router.get('/', product_controller_1.ProductController.getAllProduct);
router.post('/', multer_1.default.single('image'), product_controller_1.ProductController.createProduct);
router.get('/:id', product_controller_1.ProductController.getSingleProduct);
router.put('/:id', product_controller_1.ProductController.updateProduct);
router.delete('/:id', product_controller_1.ProductController.deleteProduct);
exports.ProductRouter = router;
