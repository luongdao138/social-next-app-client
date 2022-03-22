import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const getRoot = (state: RootState) => state.auth;

export const getAuthenticated = createSelector(getRoot, (state) => !!state?.access_token);

export const getAccessToken = createSelector(getRoot, (state) => state?.access_token);

export const getUserAuth = createSelector(getRoot, (state) => state.user);
