import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createPreviewUrl } from 'utils/convertToFile';

const getRoot = (state: RootState) => state.postForm;

export const getStatus = createSelector(getRoot, (state) =>
  state.status?.trim()
);
export const getImages = createSelector(getRoot, (state) =>
  state.images?.map((image) => ({
    ...image,
    preview_url: createPreviewUrl(image.file),
  }))
);
