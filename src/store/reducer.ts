import { combineReducers } from '@reduxjs/toolkit';
import commonReducers from './common/reducers';

const rootReducer = combineReducers({
  common: commonReducers,
});

export default rootReducer;
