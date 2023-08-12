import { Model } from 'mongoose';

export type IUser = {
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  email: string;
  password: string;
  avatar?: string;
  jwtToken?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
