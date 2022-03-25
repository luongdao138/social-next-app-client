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
