import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth';
import commonReducers from './common/reducers';
import { metadataReducer } from './metadata';
import { timelineReducer } from './timeline';
import { profileReducer } from './profile';
import { searchReducer } from './search';

const rootReducer = combineReducers({
  common: commonReducers,
  metadata: metadataReducer,
  auth: authReducer,
  profile: profileReducer,
  search: searchReducer,
  timeline: timelineReducer,
});

export default rootReducer;
