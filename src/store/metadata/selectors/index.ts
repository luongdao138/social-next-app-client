import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { Meta } from '../actions/type';

const getRoot = (state: RootState) => state.metadata;

const defaultMetadata: Meta = {
  error: false,
  loaded: false,
  pending: false,
};

export const createMetaSelector = ({ typePrefix }: { typePrefix: string }) => {
  return createSelector(getRoot, (state) => state[typePrefix] || defaultMetadata);
};
