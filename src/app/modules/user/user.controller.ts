import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';
import { Request, Response } from 'express';
import { UpdateWriteOpResult } from 'mongoose';

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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    // Handle the case where authorization header is missing
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
    return;
  }

  const users = await userService.getAllUsers(authorizationHeader);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all customers successfully',
    data: users,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getSingleUser(req.params.email);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single user successfully',
    data: user,
  });
});

const UpdateUser = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    // Handle the case where authorization header is missing
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
    return;
  }
  const data = await userService.UpdateUser(req.body, authorizationHeader);
  sendResponse<UpdateWriteOpResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update user successfully',
    data,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    // Handle the case where authorization header is missing
    sendResponse<IUser[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
    return;
  }
  const data = await userService.DeleteUser(req.body, authorizationHeader);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete user successfully',
    data,
  });
});

export const userController = {
  createUser,
  loginUser,
  getAllUsers,
  getSingle,
  UpdateUser,
  deleteUser,
};
