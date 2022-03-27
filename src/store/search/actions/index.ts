import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SEARCH_ACTION_TYPE } from './type';
import * as services from 'services/search.service';
import {
  FollowUserParams,
  FollowUserResponse,
  followUser,
  unfollowUser,
  UnfollowUserResponse,
} from 'services/profile.service';

export const setSearchKeyword = createAction<string>(SEARCH_ACTION_TYPE.SET_SEARCH_KEYWORD);

export const searchUsers = createAsyncThunk<services.SearchResponse, services.SearchParams>(
  SEARCH_ACTION_TYPE.SEARCH_USER,
  async (params, { rejectWithValue }) => {
    try {
      const res = await services.searchUsers(params);
      return res;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const clearSearchUsers = createAction<void>(SEARCH_ACTION_TYPE.CLEAR_SEARCH);

export const followUsers = createAsyncThunk<FollowUserResponse, FollowUserParams>(
  SEARCH_ACTION_TYPE.FOLLOW_USER,
  async (params, { rejectWithValue }) => {
    try {
      const res = await followUser({ ...params, is_from_list: true });
      return res;
    } catch (error: any) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const unfollowUsers = createAsyncThunk<UnfollowUserResponse, FollowUserParams>(
  SEARCH_ACTION_TYPE.UNFOLLOW_USER,
  async (params, { rejectWithValue }) => {
    try {
      const res = await unfollowUser({ ...params, is_from_list: true });
      return res;
    } catch (error: any) {
      if (!error?.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);
