import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';
import { Request, Response } from 'express';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await userService.loginUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully !',
    data: user,
    token,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { data, token } = await userService.createUser(req.body);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'create successfully',
    data: data,
    token,
  });
});

export const userController = {
  createUser,
  loginUser,
};
