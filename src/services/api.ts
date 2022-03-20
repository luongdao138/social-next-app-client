import axios, { CancelTokenSource } from 'axios';
import { URI } from 'constants/uri.constant';

const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  baseURL: URI.DOMAIN,
});

export const requestSource = (): CancelTokenSource => {
  return axios.CancelToken.source();
};

export default api;
