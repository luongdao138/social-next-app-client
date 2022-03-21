import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const getRoot = (state: RootState) => state.common;

export const getToasts = createSelector(getRoot, (state) => state.toasts);
