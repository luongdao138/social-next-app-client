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
        state.data.follower_count = state.data.follower_count + 1;
      }
      state.followers?.push(action.payload.user);
      if (state.followerMeta) {
        state.followerMeta.total_count = state.followerMeta.total_count + 1;
      }
    })
    .addCase(actions.unfollowUser.fulfilled, (state, action) => {
      if (state.data) {
        state.data.is_followed = false;
        state.data.follower_count = state.data.follower_count - 1;
      }
      if (state.followers && state.followerMeta) {
        state.followers = state.followers.filter((user) => user._id !== action.payload.user_id);
        state.followerMeta.total_count = state.followerMeta.total_count - 1;
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
    .addCase(actions.followUserFromList.fulfilled, (state, action) => {
      if (state.data?.is_own) {
        if (state.following) {
          state.following.push(action.payload.user);
        }
        if (state.followingMeta) {
          state.followingMeta.total_count = state.followingMeta.total_count + 1;
          state.data.following_count = state.data.following_count + 1;
        }
      }

      state.followers = state.followers?.map((user) => {
        if (user._id === action.payload.user._id) {
          return { ...user, is_followed: true };
        } else {
          return user;
        }
      });
      state.following = state.following?.map((user) => {
        if (user._id === action.payload.user._id) {
          return { ...user, is_followed: true };
        } else {
          return user;
        }
      });
    })
    .addCase(actions.unFollowUserFromList.fulfilled, (state, action) => {
      if (state.data?.is_own) {
        if (state.followingMeta) {
          if (state.following) {
            state.following = state.following.filter((u) => u._id !== action.payload.user_id);
          }
          state.followingMeta.total_count = state.followingMeta.total_count - 1;
          state.data.following_count = state.data.following_count - 1;
        }
      }

      state.followers = state.followers?.map((user) => {
        if (user._id === action.payload.user_id) {
          return { ...user, is_followed: false };
        } else {
          return user;
        }
      });
      state.following = state.following?.map((user) => {
        if (user._id === action.payload.user_id) {
          return { ...user, is_followed: false };
        } else {
          return user;
        }
      });
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
