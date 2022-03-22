import { URI } from 'constants/uri.constant';
import { actions } from 'store/auth';
import { StoreType } from 'store/store';
import api from './api';

export const applyInterceptor = (store: StoreType) => {
  api.interceptors.request.use(
    (config) => {
      if (!config.headers?.Authorization && !config.headers?.authorization) {
        const { auth } = store.getState();
        const access_token = auth.access_token;
        if (access_token) {
          const token = `Bearer ${access_token}`;
          if (token && config.headers) {
            config.headers.Authorization = token;
          }
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const { auth } = store.getState();
      const refresh_token = auth.refresh_token;
      const status = error.response ? error.response.status : null;
      const errorMessage = error.response ? error.response?.data?.msg : '';

      if (status === 401 && errorMessage === 'Invalid access token' && !originalRequest._retry) {
        // access token expired
        // refresh token here
        console.log('Refresing token!');

        // prevent the infinite loop
        originalRequest._retry = true;
        const res = await api.post(URI.REFRESH, { refresh_token });
        store.dispatch({ type: actions.loginByEmail.fulfilled.toString(), payload: res.data });
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;

        return api(originalRequest);

        // call the api to refresh the token
      } else if (status === 401 && errorMessage === 'Invalid refresh token') {
        if (auth.access_token) {
          console.log('Refresh token expired and logout!');
          store.dispatch(actions.logout());
        }
      }

      return Promise.reject(error);
    }
  );
};
