import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIMELINE_TYPE } from './type';
import * as services from 'services/timeline.service';

export const createPost = createAsyncThunk<
  services.CreatePostResponse,
  services.CreatePostParams
>(TIMELINE_TYPE.CREAT_POST, async (params, { rejectWithValue }) => {
  try {
    const res = await services.createPost(params);
    return res;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response.data);
  }
});
