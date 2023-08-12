import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { Request, Response } from 'express';
import { UserService } from './user.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await UserService.loginUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully !',
    data: user,
    token,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { data, token } = await UserService.createUser(req.body);
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

  const users = await UserService.getAllUsers(authorizationHeader);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all customers successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getSingleUser(req.params.email);
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
  const data = await UserService.UpdateUser(
    req.params.email,
    req.body,
    authorizationHeader,
  );
  sendResponse(res, {
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
  const data = await UserService.DeleteUser(
    req.params.email,
    authorizationHeader,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete user successfully',
    data,
  });
});

export const UserController = {
  createUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  UpdateUser,
  deleteUser,
};
