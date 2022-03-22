import { createReducer } from '@reduxjs/toolkit';
import { UserAuth } from 'services/auth.service';
import * as actions from '../actions';

interface StateType {
  user?: UserAuth;
  access_token?: string;
}

const initialState: StateType = {};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.loginByEmail.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    })
    .addCase(actions.registerByEmail.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    });
});

export default authReducer;
