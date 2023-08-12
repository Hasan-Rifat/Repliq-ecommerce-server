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
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../../config");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const verifyToken_1 = __importDefault(require("../../../shared/verifyToken"));
const product_model_1 = require("./product.model");
const createProduct = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    const newProduct = new product_model_1.Product(payload);
    const data = yield newProduct.save();
    return data;
});
const getAllProducts = (token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    const data = yield product_model_1.Product.find();
    return data;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = product_model_1.Product.findOne({ _id: id });
    return user;
});
const UpdateProduct = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    // update product
    const data = product_model_1.Product.updateOne({ _id: id }, {
        $set: payload,
    }, { new: true });
    return data;
});
const DeleteProduct = (_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if (!(0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid activity');
    }
    // delete user
    const data = yield product_model_1.Product.deleteOne({ _id });
    return data;
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    UpdateProduct,
    DeleteProduct,
};
