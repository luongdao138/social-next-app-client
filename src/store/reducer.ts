import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import commonReducers from './common/reducers';
import { metadataReducer } from './metadata';

const rootReducer = combineReducers({
  common: commonReducers,
  metadata: metadataReducer,
  auth: authReducer,
});

export default rootReducer;
