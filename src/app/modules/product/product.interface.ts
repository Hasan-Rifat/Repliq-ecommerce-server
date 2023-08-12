import { Model } from 'mongoose';

export type IProduct = {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  email: string;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
