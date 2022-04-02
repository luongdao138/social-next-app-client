import { createAction } from '@reduxjs/toolkit';
import { POST_FORM_TYPE } from './type';
import * as services from 'services/postForm.service';

export const updateStatus = createAction<string>(POST_FORM_TYPE.UPDATE_STATUS);
export const updateImages = createAction<services.FileItem[]>(
  POST_FORM_TYPE.UPDATE_IMAGES
);
export const resetForm = createAction(POST_FORM_TYPE.RESET_FORM);
