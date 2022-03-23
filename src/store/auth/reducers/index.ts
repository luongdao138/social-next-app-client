import { createReducer } from '@reduxjs/toolkit';
import { UserAuth } from 'services/auth.service';
import * as actions from '../actions';

interface StateType {
  user?: UserAuth;
  access_token?: string;
  refresh_token?: string;
}

const initialState: StateType = {};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.loginByEmail.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    })
    .addCase(actions.registerByEmail.fulfilled, (state, action) => {
      state.user = action.payload.user;
    })
    .addCase(actions.logout, (state, action) => {
      state.user = undefined;
      state.access_token = undefined;
      state.refresh_token = undefined;
    });
  // .addCase(actions.verifyEmail.fulfilled, (state, action) => {
  //   state.user = undefined;
  // });
});

export default authReducer;
