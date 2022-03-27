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
