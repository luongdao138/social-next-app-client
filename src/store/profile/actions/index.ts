import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as services from 'services/profile.service';
import { PROFILE_ACTION_TYPE } from './type';

export const getUserProfile = createAsyncThunk<services.UserProfileResponse, string | undefined>(
  PROFILE_ACTION_TYPE.GET_USER_PROFILE,
  async (param, { rejectWithValue }) => {
    try {
      const res = await services.getUserProfile(param);
      return res;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.reponse.data);
    }
  }
);

export const clearUserProfile = createAction<void>(PROFILE_ACTION_TYPE.CLEAR_USER_PROFILE);

export const updateUserProfile = createAsyncThunk<
  services.UserProfileResponse,
  services.EditProfileParams
>(PROFILE_ACTION_TYPE.UPDATE_USER_PROFILE, async (params, { rejectWithValue }) => {
  try {
    const res = await services.editUserProfile(params);
    return res;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error);
  }
});

export const followUser = createAsyncThunk<services.FollowUserResponse, services.FollowUserParams>(
  PROFILE_ACTION_TYPE.FOLLOW_USER,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.followUser(params);
      return res;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error);
    }
  }
);

export const unfollowUser = createAsyncThunk<
  services.UnfollowUserResponse,
  services.FollowUserParams
>(PROFILE_ACTION_TYPE.UNFOLLOW_USER, async (params, { rejectWithValue }) => {
  try {
    const res = await services.unfollowUser(params);
    return res;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error);
  }
});

export const getUserFollowers = createAsyncThunk<
  services.GetFollowResponse,
  services.GetFollowParams
>(PROFILE_ACTION_TYPE.GET_USER_FOLLOWERS, async (params, { rejectWithValue }) => {
  try {
    const res = await services.getUserFollowers(params);
    return res;
  } catch (error: any) {
    if (!error?.response) {
      throw error;
    }

    return rejectWithValue(error.response.data);
  }
});

export const getUserFollowing = createAsyncThunk<
  services.GetFollowResponse,
  services.GetFollowParams
>(PROFILE_ACTION_TYPE.GET_USER_FOLLOWING, async (params, { rejectWithValue }) => {
  try {
    const res = await services.getUserFollowing(params);
    return res;
  } catch (error: any) {
    if (!error?.response) {
      throw error;
    }

    return rejectWithValue(error.response.data);
  }
});

export const clearUserFollowers = createAction<void>(PROFILE_ACTION_TYPE.CLEAR_USER_FOLLOWERS);

export const clearUserFollowing = createAction<void>(PROFILE_ACTION_TYPE.CLEAR_USER_FOLLOWING);
