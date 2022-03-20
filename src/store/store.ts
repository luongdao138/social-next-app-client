import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const storeWrapper = createWrapper(makeStore);

export type StoreType = ReturnType<typeof makeStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = ReturnType<StoreType['dispatch']>;
export default storeWrapper;
