/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';
import { Error } from 'mongoose';

const storage = multer.diskStorage({
  destination: 'images/',
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const support = /png|jpg/;
    const extension = path.extname(file.originalname);

    if (support.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  },

  limits: {
    fileSize: 5000000,
  },
});

export = uploader;
