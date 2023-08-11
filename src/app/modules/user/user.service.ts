import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from './user.model';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../../../config';
import { IUser } from './user.interface';

const loginUser = async (payload: {
  email: string;
  password: string;
}): Promise<{
  token: string;
  user: IUser;
}> => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const passwordsMatch = await compare(password, user.password);
  if (!passwordsMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const token = sign(email, config.jwt_secret as Secret);

  return {
    token,
    user,
  };
};

const createUser = async (
  payload: IUser,
): Promise<{
  data: IUser;
  token: string;
}> => {
  const { email, firstName, lastName, password, avatar } = payload;

  // Check if user with email already exists
  const userExists = await User.where({ email });
  if (userExists.length > 0) {
    throw new ApiError(httpStatus.ALREADY_REPORTED, 'User already exists');
  }

  // Generate a salt to use for password encryption with bcrypt
  const salt = await bcrypt.genSalt(10);

  // Encrypt the user's password with bcrypt
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user and save to the database
  const data: IUser = await User.create({
    firstName,
    lastName,
    avatar,
    email,
    password: hashedPassword,
  });

  // Generate JWT token
  const token = jwt.sign(email, config.jwt_secret as Secret);

  return {
    data,
    token,
  };
};

export const userService = {
  createUser,
  loginUser,
};
