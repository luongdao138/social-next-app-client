import { URI } from 'constants/uri.constant';
import api from './api';
import { UserRole, UserGender } from './auth.service';

// api types
export interface UserProfile {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  gender: UserGender;
  address?: string;
  mobile?: string;
  website?: string;
  avatar?: string;
  role?: UserRole;
  verified?: boolean;
  story?: string;
  is_following?: boolean;
  is_followed?: boolean;
  follower_count?: number;
  following_count?: number;
  is_own?: boolean;
}

export interface EditProfileParams {
  fullname?: string;
  mobile?: string;
  address?: string;
  website?: string;
  story?: string;
  gender?: UserGender;
}

export interface UserProfileResponse {
  user: UserProfile;
}

// call apis
export const getUserProfile = async (param?: string): Promise<UserProfileResponse> => {
  const res = await api.get<UserProfileResponse>(`${URI.GET_USER_PROFILE}/${param ?? ''}`);
  return res.data;
};

export const editUserProfile = async (params: EditProfileParams): Promise<UserProfileResponse> => {
  const res = await api.put<UserProfileResponse>(URI.UPDATE_USER_PROFILE, params);
  return res.data;
};
