import { Model } from 'mongoose';

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  jwtToken?: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
