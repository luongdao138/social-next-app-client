import { createAction } from '@reduxjs/toolkit';
import { SEARCH_ACTION_TYPE } from './type';

export const setSearchKeyword = createAction<string>(SEARCH_ACTION_TYPE.SET_SEARCH_KEYWORD);
