import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from './storage';

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
  }

  const persistConfig = {
    key: 'auth',
    whitelist: ['auth'],
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  return store;
};

const storeWrapper = createWrapper(makeStore);

export type StoreType = ReturnType<typeof makeStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
export default storeWrapper;
