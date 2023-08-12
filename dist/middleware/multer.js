"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = require("mongoose");
const storage = multer_1.default.diskStorage({
    destination: 'images/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});
const uploader = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        const support = /png|jpg/;
        const extension = path_1.default.extname(file.originalname);
        if (support.test(extension)) {
            cb(null, true);
        }
        else {
            cb(null, (new mongoose_1.Error('File type not supported'), false));
        }
    },
    limits: {
        fileSize: 5000000,
    },
});
module.exports = uploader;
