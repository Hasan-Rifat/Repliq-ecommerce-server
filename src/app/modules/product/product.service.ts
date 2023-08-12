import httpStatus from 'http-status';
import { config } from '../../../config';
import ApiError from '../../../errors/ApiError';
import verifyToken from '../../../shared/verifyToken';
import { IProduct } from './product.interface';
import { Product } from './product.model';
import { Secret } from 'jsonwebtoken';

const createProduct = async (
  payload: IProduct,
  token: string,
): Promise<IProduct> => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  const newProduct = new Product(payload);
  const data = await newProduct.save();
  return data;
};

const getAllProducts = async (token: string): Promise<IProduct[]> => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  const data = await Product.find();
  return data;
};

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
  const user = Product.findOne({ _id: id });
  return user;
};

const UpdateProduct = async (
  id: string,
  payload: Partial<IProduct>,
  token: string,
) => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  // update product
  const data = Product.updateOne(
    { _id: id },
    {
      $set: payload,
    },
    { new: true },
  );
  return data;
};

const DeleteProduct = async (_id: string, token: string) => {
  token = token.split(' ')[1];

  if (!verifyToken(token, config.jwt_secret as Secret)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid activity');
  }

  // delete user
  const data = await Product.deleteOne({ _id });
  return data;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  UpdateProduct,
  DeleteProduct,
};
