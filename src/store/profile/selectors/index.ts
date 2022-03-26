import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const getRoot = (state: RootState) => state.profile;

export const getUserProfile = createSelector(getRoot, (state) => state.data);
export const getUserFollowers = createSelector(getRoot, (state) => state.followers);
export const getUserFollowing = createSelector(getRoot, (state) => state.following);
export const getUserFollowersMeta = createSelector(getRoot, (state) => state.followerMeta);
export const getUserFollowingMeta = createSelector(getRoot, (state) => state.followingMeta);
