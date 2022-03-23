import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_ACTION_TYPE } from './type';
import * as services from 'services/auth.service';

export const loginByEmail = createAsyncThunk<services.UserLoginReponse, services.UserLoginParams>(
  AUTH_ACTION_TYPE.LOGIN_BY_EMAIL,
  async (loginParams, { rejectWithValue }) => {
    try {
      const res = await services.loginByEmail(loginParams);
      return res;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const registerByEmail = createAsyncThunk<
  services.UserResgisterReponse,
  services.UserRegisterParams
>(AUTH_ACTION_TYPE.REGISTER_BY_EMAIL, async (params, { rejectWithValue }) => {
  try {
    const res = await services.registerByEmail(params);
    return res;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response.data);
  }
});

export const logout = createAction<void>(AUTH_ACTION_TYPE.LOGOUT);

export const verifyEmail = createAsyncThunk<
  services.VerifyEmailResponse,
  services.VerifyEmailParams
>(AUTH_ACTION_TYPE.VERIFY_EMAIL, async (params, { rejectWithValue }) => {
  try {
    const res = await services.verifyEmail(params);
    return res;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response.data);
  }
});

export const resendVerifyEmail = createAsyncThunk<
  services.ResendVerifyEmailResponse,
  services.ResendVerifyEmailParams
>(AUTH_ACTION_TYPE.RESEND_VERIFY_EMAIL, async (params, { rejectWithValue }) => {
  try {
    const res = await services.resendVerifyEmail(params);
    return res;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});
