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

export interface UserFollow {
  _id: string;
  username: string;
  fullname: string;
  avatar?: string;
  is_followed?: boolean;
  is_following?: boolean;
}

export interface EditProfileParams {
  fullname?: string;
  mobile?: string;
  address?: string;
  website?: string;
  story?: string;
  gender?: UserGender;
  avatar?: string;
}

export interface FollowUserParams {
  user_id: string;
  type: 'follow' | 'unfollow';
}

export interface GetFollowParams {
  page: number;
  user_id: number;
}

export interface GetFollowResponse {
  meta: PageMeta;
  data: UserFollow[];
}

export interface PageMeta {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

export interface UserProfileResponse {
  user: UserProfile;
}

export interface FollowUserResponse {
  user: UserFollow;
}

export interface UnfollowUserResponse {
  user_id: string;
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

export const followUser = async (params: FollowUserParams): Promise<FollowUserResponse> => {
  const res = await api.put<FollowUserResponse>(URI.FOLLOW_USER, params);
  return res.data;
};

export const unfollowUser = async (params: FollowUserParams): Promise<UnfollowUserResponse> => {
  const res = await api.put<UnfollowUserResponse>(URI.UNFOLLOW_USER, params);
  return res.data;
};

export const getUserFollowers = async (params: GetFollowParams): Promise<GetFollowResponse> => {
  const res = await api.post<GetFollowResponse>(URI.GET_USER_FOLLOWERS, params);
  return res.data;
};

export const getUserFollowing = async (params: GetFollowParams): Promise<GetFollowResponse> => {
  const res = await api.post<GetFollowResponse>(URI.GET_USER_FOLLOWING, params);
  return res.data;
};
