import { createReducer } from '@reduxjs/toolkit';
import { PageMeta, UserFollow, UserProfile } from 'services/profile.service';
import * as actions from '../actions';

interface StateType {
  data?: UserProfile;
  followers?: UserFollow[];
  following?: UserFollow[];
  followerMeta?: PageMeta;
  followingMeta?: PageMeta;
}

const initialState: StateType = {
  followers: [],
  following: [],
};

const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getUserProfile.fulfilled, (state, action) => {
      state.data = action.payload.user;
    })
    .addCase(actions.clearUserProfile, (state) => {
      state.data = undefined;
    })
    .addCase(actions.updateUserProfile.fulfilled, (state, action) => {
      state.data = { ...state.data, ...action.payload.user };
    })
    .addCase(actions.followUser.fulfilled, (state, action) => {
      if (state.data) {
        state.data.is_followed = true;
        state.data.follower_count = (state.data.follower_count || 0) + 1;
      }
    })
    .addCase(actions.unfollowUser.fulfilled, (state, action) => {
      if (state.data) {
        state.data.is_followed = false;
        state.data.follower_count = (state.data.follower_count || 0) - 1;
      }
    })
    .addCase(actions.getUserFollowers.fulfilled, (state, action) => {
      let tmpFollowers = action.payload.data;

      if (action.payload.meta && action.payload.meta.current_page > 1 && state.followers) {
        tmpFollowers = state.followers.concat(tmpFollowers);
      }
      state.followers = tmpFollowers;
      state.followerMeta = action.payload.meta;
    })
    .addCase(actions.getUserFollowing.fulfilled, (state, action) => {
      let tmpFollowing = action.payload.data;

      if (action.payload.meta && action.payload.meta.current_page > 1 && state.following) {
        tmpFollowing = state.following.concat(tmpFollowing);
      }
      state.following = tmpFollowing;
      state.followingMeta = action.payload.meta;
    })
    .addCase(actions.clearUserFollowing, (state) => {
      state.following = [];
      state.followingMeta = undefined;
    })
    .addCase(actions.clearUserFollowers, (state) => {
      state.followers = [];
      state.followerMeta = undefined;
    });
});

export default profileReducer;
