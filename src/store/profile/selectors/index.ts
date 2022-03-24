import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const getRoot = (state: RootState) => state.profile;

export const getUserProfile = createSelector(getRoot, (state) => state.data);
