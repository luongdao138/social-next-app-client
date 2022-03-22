import { combineReducers } from '@reduxjs/toolkit';
import commonReducers from './common/reducers';
import { metadataReducer } from './metadata';

const rootReducer = combineReducers({
  common: commonReducers,
  metadata: metadataReducer,
});

export default rootReducer;
