import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await OrderService.createOder(req.body, authorizationHeader);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully!',
    data: data,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await OrderService.getAllOrders(authorizationHeader);

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Order successfully!',
    data: data,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await OrderService.getSingleOrder(
    req.params.id,
    authorizationHeader,
  );

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Order successfully!',
    data: data,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await OrderService.updateOrder(
    req.params.id,
    req.body,
    authorizationHeader,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully!',
    data: data,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await OrderService.deleteOrder(
    req.params.id,
    authorizationHeader,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully!',
    data: data,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
