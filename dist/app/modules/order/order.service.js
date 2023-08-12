"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const verifyToken_1 = __importDefault(require("../../../shared/verifyToken"));
const order_model_1 = require("./order.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = require("../../../config");
const createOder = (order, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    const { productIds, email, totalPrice } = order;
    const data = yield order_model_1.Order.create({
        productIds,
        email,
        totalPrice,
    });
    return data;
});
const getAllOrders = (token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    const data = yield order_model_1.Order.find({}).populate('productIds');
    return data;
});
const getSingleOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    const data = order_model_1.Order.findOne({
        _id: id,
    }).populate('productIds');
    return data;
});
const updateOrder = (id, order, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    const data = yield order_model_1.Order.findByIdAndUpdate(id, order, { new: true }).populate('productIds');
    return data;
});
const deleteOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    const data = yield order_model_1.Order.deleteOne({
        _id: id,
    }).populate('productIds');
    return data;
});
exports.OrderService = {
    createOder,
    getAllOrders,
    getSingleOrder,
    updateOrder,
    deleteOrder,
};
