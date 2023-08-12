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
exports.UserService = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
const bcrypt_2 = __importDefault(require("bcrypt"));
const config_1 = require("../../../config");
const verifyToken_1 = __importDefault(require("../../../shared/verifyToken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    const passwordsMatch = yield (0, bcrypt_1.compare)(password, user.password);
    if (!passwordsMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
    // token
    const token = (0, jsonwebtoken_1.sign)(email, config_1.config.jwt_secret);
    return {
        token,
        user,
    };
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, password, avatar, role } = payload;
    // Check if user with email already exists
    const userExists = yield user_model_1.User.where({ email });
    if (userExists.length > 0) {
        throw new ApiError_1.default(http_status_1.default.ALREADY_REPORTED, 'User already exists');
    }
    // Generate a salt to use for password encryption with bcrypt
    const salt = yield bcrypt_2.default.genSalt(10);
    // Encrypt the user's password with bcrypt
    const hashedPassword = yield bcrypt_2.default.hash(password, salt);
    // Create a new user and save to the database
    const data = yield user_model_1.User.create({
        firstName,
        lastName,
        avatar,
        role,
        email,
        password: hashedPassword,
    });
    // Generate JWT token
    const token = jsonwebtoken_2.default.sign(email, config_1.config.jwt_secret);
    return {
        data,
        token,
    };
});
const getAllUsers = (token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if ((0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        return yield user_model_1.User.find();
    }
    else {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
});
const getSingleUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = user_model_1.User.findOne({ email });
    return user;
});
const UpdateUser = (email, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if ((0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        // update user
        const data = yield user_model_1.User.findOneAndUpdate({ email }, payload, { new: true });
        return data;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
});
const DeleteUser = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    token = token.split(' ')[1];
    if ((0, verifyToken_1.default)(token, config_1.config.jwt_secret)) {
        // delete user
        const data = yield user_model_1.User.deleteOne({ email });
        return data;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid credentials');
    }
});
exports.UserService = {
    createUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    UpdateUser,
    DeleteUser,
};
