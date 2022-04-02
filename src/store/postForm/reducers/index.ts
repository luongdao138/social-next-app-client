import { createReducer } from '@reduxjs/toolkit';
import { FileItem } from 'services/postForm.service';
import * as actions from '../actions';

interface StateType {
  status?: string;
  images?: FileItem[];
}

const initialState: StateType = {
  status: '',
  images: [],
};

const postFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.updateStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(actions.updateImages, (state, action) => {
      state.images = action.payload;
    })
    .addCase(actions.resetForm, (state, action) => {
      state.images = undefined;
      state.status = undefined;
    });
});

export default postFormReducer;
