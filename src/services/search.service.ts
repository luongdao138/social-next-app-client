import { URI } from 'constants/uri.constant';
import api from './api';

export interface UserResponse {
  _id: string;
  avatar: string;
  fullname: string;
  username: string;
  is_followed?: boolean;
}

export interface PageMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
}

export interface SearchParams {
  keyword: string;
  page: number;
}

export interface SearchResponse {
  data: UserResponse[];
  meta: PageMeta;
}

// apis
export const searchUsers = async (params: SearchParams): Promise<SearchResponse> => {
  const res = await api.get<SearchResponse>(URI.SEARCH_USERS, { params });
  return res.data;
};
