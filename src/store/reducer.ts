import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import commonReducers from './common/reducers';
import { metadataReducer } from './metadata';
import { profileReducer } from './profile';

const rootReducer = combineReducers({
  common: commonReducers,
  metadata: metadataReducer,
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
