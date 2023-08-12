import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProduct } from './product.interface';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IProduct[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await ProductService.createProduct(
    req.body,
    authorizationHeader,
  );

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully!',
    data: data,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IProduct[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await ProductService.getAllProducts(authorizationHeader);

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Product successfully!',
    data: data,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const data = await ProductService.getSingleProduct(req.params.id);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get single Product successfully!',
    data: data,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IProduct[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await ProductService.UpdateProduct(
    req.params.id,
    req.body,
    authorizationHeader,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully!',
    data: data,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return sendResponse<IProduct[]>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'Authorization header is missing',
      data: [],
    });
  }

  const data = await ProductService.DeleteProduct(
    req.params.id,
    authorizationHeader,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully!',
    data: data,
  });
});

export const ProductController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
