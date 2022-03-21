import { createAction } from '@reduxjs/toolkit';
import { AddToastParams } from '../reducers';
import { TOAST_ACTION_TYPE } from './type';

export const addToast = createAction<AddToastParams>(TOAST_ACTION_TYPE.ADD_TOAST);
export const removeToast = createAction<string>(TOAST_ACTION_TYPE.REMOVE_TOAST);
export const cleanToast = createAction<void>(TOAST_ACTION_TYPE.CLEAN_TOAST);
