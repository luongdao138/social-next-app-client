import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from 'redux-persist';

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

  // const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;

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

export type StoreType = ReturnType<typeof makeStore>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];
export default makeStore;
