import { createReducer } from '@reduxjs/toolkit';
import { UserProfile } from 'services/profile.service';
import * as actions from '../actions';

interface StateType {
  data?: UserProfile;
}

const initialState: StateType = {};

const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getUserProfile.fulfilled, (state, action) => {
      state.data = action.payload.user;
    })
    .addCase(actions.clearUserProfile, (state) => {
      state.data = undefined;
    });
});

export default profileReducer;
