import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const getRoot = (state: RootState) => state.search;

export const getSearchKeyword = createSelector(getRoot, (state) => state.keyword);
export const getSearchData = createSelector(getRoot, (state) => state.searchData);
export const getSearchMeta = createSelector(getRoot, (state) => state.searchMeta);
