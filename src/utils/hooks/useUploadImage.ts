import { useState } from 'react';
import { UploadImageResponse } from 'services/image.service';
import useToast from './useToast';
import * as services from 'services/image.service';

const useUploadImage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<UploadImageResponse | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const { addToast } = useToast();

  const uploadImage = async (file: File, onSuccess?: (result: UploadImageResponse) => void) => {
    try {
      setIsUploading(true);
      const res = await services.upload(file, (_progress) => {
        setProgress(_progress);
      });
      setUploadResult(res);
      onSuccess && onSuccess(res);
    } catch (error) {
      setHasError(true);
      addToast({
        message: 'Can not upload image, try again later!',
        severity: 'error',
      });
    } finally {
      setProgress(0);
      setIsUploading(false);
    }
  };

  return {
    progress,
    isUploading,
    hasError,
    uploadResult,
    uploadImage,
  };
};

export default useUploadImage;
