import axios from 'axios';
import { URI } from 'constants/uri.constant';

export interface UploadImageResponse {
  public_id: string;
  secure_url: string;
}

export const upload = async (
  file: File,
  uploadListener?: (p: number) => void
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'cloud_name',
    process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string
  );
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  );

  const res = await axios.post<UploadImageResponse>(
    'https://api.cloudinary.com/v1_1/luongdao/image/upload',
    formData,
    {
      onUploadProgress: (progressEvent) => {
        if (uploadListener) {
          console.log(progressEvent);
          uploadListener(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        }
      },
    }
  );
  return res.data;
};
