import { Model, Types } from 'mongoose';

export type IOrder = {
  productIds: Types.ObjectId; // Assuming these are references to products in your DB
  email: string;
  totalPrice: string;
};

export type ProductModel = Model<IOrder, Record<string, unknown>>;
