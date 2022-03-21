import { createReducer } from '@reduxjs/toolkit';
import { TOAST_ACTION_TYPE } from '../actions/type';
import { v4 as uuidv4 } from 'uuid';
import * as actions from '../actions';

export interface Toast {
  id: string;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export type AddToastParams = Omit<Toast, 'id'>;

interface StateType {
  toasts: Toast[];
}

const intialState: StateType = {
  toasts: [],
};

const commonReducers = createReducer(intialState, (builder) => {
  builder
    .addCase(actions.addToast, (state, action) => {
      const newToast: Toast = { id: uuidv4(), ...action.payload };
      state.toasts = [...state.toasts, newToast];
    })
    .addCase(actions.removeToast, (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    })
    .addCase(actions.cleanToast, (state) => {
      state.toasts = [];
    });
});

export default commonReducers;
