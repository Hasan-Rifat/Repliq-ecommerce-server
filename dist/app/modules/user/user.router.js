"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.UserController.getAllUsers);
router.post('/register', user_controller_1.UserController.createUser);
router.post('/login', user_controller_1.UserController.loginUser);
router.get('/:email', user_controller_1.UserController.getSingleUser);
router.put('/:email', user_controller_1.UserController.UpdateUser);
router.delete('/:email', user_controller_1.UserController.deleteUser);
exports.userRouter = router;
