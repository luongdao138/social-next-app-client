import { StoreType } from 'store/store';
import api from './api';

export const applyInterceptor = (store: StoreType) => {
  api.interceptors.request.use(
    (config) => {
      // const { auth  } = store.getState();
      // const user = auth.user;
      // if(user) {
      //   const token = `Bearer ${user.accessToken}`;
      //   if(token && config.headers) {
      //     config.headers.Authorization = token;
      //   }
      // }

      return config;
    },
    (error) => Promise.reject(error)
  );
};
