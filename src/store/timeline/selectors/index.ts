import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createPreviewUrl } from 'utils/convertToFile';

const getRoot = (state: RootState) => state.timeline;
