import { URI } from 'constants/uri.constant';
import api from './api';

export type UserRole = 'user' | 'admin';
export type UserGender = 'male' | 'female' | 'other';
export interface UserAuth {
  _id: string;
  email: string;
  username: string;
  fullname: string;
  story?: string;
  website?: string;
  address?: string;
  avatar: string;
  role?: UserRole;
  gender?: UserGender;
  mobile?: string;
  followers: string[];
  following: string[];
  verified?: boolean;
}

export interface UserLoginParams {
  email: string;
  password: string;
}

export interface UserRegisterParams {
  username: string;
  fullname: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
}

export interface UserLoginReponse {
  msg: string;
  access_token: string;
  user: UserAuth;
  refresh_token: string;
}
export interface UserResgisterReponse {
  msg: string;
  user: UserAuth;
}

export const loginByEmail = async (params: UserLoginParams): Promise<UserLoginReponse> => {
  const res = await api.post<UserLoginReponse>(URI.LOGIN_BY_EMAIL, params);
  return res.data;
};

export const registerByEmail = async (
  params: UserRegisterParams
): Promise<UserResgisterReponse> => {
  const res = await api.post<UserResgisterReponse>(URI.REGISTER_BY_EMAIL, params);
  return res.data;
};
