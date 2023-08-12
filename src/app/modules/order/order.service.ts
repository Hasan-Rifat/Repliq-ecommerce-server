import verifyToken from '../../../shared/verifyToken';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { config } from '../../../config';

const createOder = async (order: IOrder, token: string) => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  const { productIds, email, totalPrice } = order;

  const data = await Order.create({
    productIds,
    email,
    totalPrice,
  });

  return data;
};

const getAllOrders = async (token: string) => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  const data = await Order.find({}).populate('productIds');
  return data;
};

const getSingleOrder = async (id: string, token: string) => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  const data = Order.findOne({
    _id: id,
  }).populate('productIds');

  return data;
};

const updateOrder = async (id: string, order: IOrder, token: string) => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  const data = await Order.findByIdAndUpdate(id, order, { new: true }).populate(
    'productIds',
  );
  return data;
};

const deleteOrder = async (id: string, token: string) => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  const data = await Order.deleteOne({
    _id: id,
  }).populate('productIds');
  return data;
};

export const OrderService = {
  createOder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
