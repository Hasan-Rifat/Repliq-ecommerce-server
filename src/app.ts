import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import routers from './app/routes';
import path from 'path';

const app: Application = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routers);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
