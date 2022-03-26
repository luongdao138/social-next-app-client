import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const getRoot = (state: RootState) => state.profile;
const getUserAuth = (state: RootState) => state.auth.user;

export const getUserProfile = createSelector(getRoot, (state) => state.data);
export const getUserFollowers = createSelector(getRoot, getUserAuth, (state, user) =>
  state.followers?.map((u) => ({ ...u, is_own: u._id === user?._id }))
);
export const getUserFollowing = createSelector(getRoot, getUserAuth, (state, user) =>
  state.following?.map((u) => ({ ...u, is_own: u._id === user?._id }))
);
export const getUserFollowersMeta = createSelector(getRoot, (state) => state.followerMeta);
export const getUserFollowingMeta = createSelector(getRoot, (state) => state.followingMeta);
