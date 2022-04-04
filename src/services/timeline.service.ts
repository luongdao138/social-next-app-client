import { URI } from 'constants/uri.constant';
import api from './api';
import { upload } from './image.service';

// types
export interface FileItem {
  file: File;
  id: string;
  description?: string;
}

export interface PageMeta {
  current_page?: number;
  total_pages?: number;
  total_count?: number;
  per_page?: number;
}

export interface Image {
  _id: string;
  url: string;
  public_id?: string;
  description?: string;
}

export interface PostCreator {
  _id: string;
  username: string;
  avatar?: string;
}

export interface TimelinePost {
  content: string;
  images: Image[];
  _id: string;
  createdAt: Date;
  user: PostCreator;
}

export interface CreatePostParams {
  content?: string;
  images: FileItem[];
}

export interface CreatePostResponse {
  post: TimelinePost;
}

// apis
export const createPost = async (
  data: CreatePostParams
): Promise<CreatePostResponse> => {
  // upload images
  let images = [];
  for (let image of data.images) {
    const imageRes = await upload(image.file);
    images.push({
      description: image.description,
      url: imageRes.secure_url,
      public_id: imageRes.public_id,
    });
  }

  const iRes = await api.post<{ images: Image[] }>(URI.CREATE_IMAGE, {
    images,
  });
  const res = await api.post<CreatePostResponse>(URI.CREATE_POST, {
    ...data,
    images: iRes.data.images,
  });
  return res.data;
};
