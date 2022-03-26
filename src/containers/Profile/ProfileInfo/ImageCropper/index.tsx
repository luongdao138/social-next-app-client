import ButtonPrimary from 'components/Button/ButtonPrimary';
import LSModal from 'components/Modal';
import LSSlider from 'components/Slider';
import React, { useEffect, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PercentCrop,
  PixelCrop,
} from 'react-image-crop';
import { UploadImageResponse } from 'services/image.service';
import useEffectDebounce from 'utils/hooks/useEffectDebounce';
import { canvasPreview } from './canvasPreview';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ width: 180, unit: 'px' }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

interface Props {
  open?: boolean;
  onClose: () => void;
  originalImage?: string;
  uploadAvatar: (file: File, cb?: (res: UploadImageResponse) => void) => void;
  uploadProgress: number;
  isUploading?: boolean;
}

const ImageCropper: React.FC<Props> = ({
  open,
  onClose,
  originalImage,
  uploadAvatar,
  uploadProgress,
  isUploading,
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(originalImage);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState<number>(1);

  console.log(uploadProgress);

  const handleChangeScale = (newScale: number) => {
    setScale(newScale);
  };

  const handleCropChange = (crop: PixelCrop, percentageCrop: PercentCrop) => {
    setCrop(percentageCrop);
  };

  const handleCropCompleted = (crop: PixelCrop, percentageCrop: PercentCrop) => {
    setCompletedCrop(crop);
  };

  const handleClickChooseFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleClose = () => {
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, 1));
      setImgSrc(originalImage);
      setCompletedCrop(undefined);
      setScale(1);
      onClose();
    } else {
      onClose();
    }
  };

  const handleUploadAvatar = async () => {
    if (previewCanvasRef.current) {
      const canvasDataURL = previewCanvasRef.current.toDataURL('image/jpeg');
      const res: Response = await fetch(canvasDataURL);
      const blob: Blob = await res.blob();
      const file = new File([blob], 'image', { type: 'image/jpg' });

      if (file) {
        uploadAvatar(file, (res) => {
          setImgSrc(res.secure_url);
          setCompletedCrop(undefined);
          setScale(1);
          onClose();
        });
      }
    }
  };

  const onLoadImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, 1));
    }
  }, [open]);

  useEffectDebounce({
    handler: async () => {
      if (
        completedCrop?.height &&
        completedCrop?.width &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale);
      }
    },
    timeout: 100,
    deps: [completedCrop, scale],
  });

  return (
    <LSModal open={open} fullWidth maxWidth='6xl'>
      <div className='w-full gap-4 flex flex-col items-center justify-center'>
        <input type='file' hidden ref={inputFileRef} accept='image/*' onChange={onSelectFile} />
        {uploadProgress ? (
          <div className='w-full relative max-w-md mx-auto h-1 rounded-xl bg-gray-400 '>
            <span
              className='absolute rounded-xl top-0 left-0 bottom-0 bg-teal-500'
              style={{ width: `${uploadProgress}%` }}
            ></span>
          </div>
        ) : null}
        {Boolean(imgSrc) && (
          <ReactCrop
            onChange={handleCropChange}
            crop={crop}
            onComplete={handleCropCompleted}
            aspect={1}
            circularCrop
            minWidth={180}
            maxWidth={180}
            // minHeight={180}
            // maxHeight={180}
            keepSelection
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt='Image crop'
              onLoad={onLoadImage}
              className='object-cover'
              style={{ maxHeight: 400, maxWidth: '100%', transform: `scale(${scale})` }}
              crossOrigin='anonymous'
            />
          </ReactCrop>
        )}
        {imgSrc && (
          <LSSlider min={0.5} max={2} step={0.1} value={scale} onChange={handleChangeScale} />
        )}

        {Boolean(completedCrop) && (
          <canvas
            ref={previewCanvasRef}
            style={{
              objectFit: 'contain',
              width: completedCrop?.width,
              height: completedCrop?.height,
              borderRadius: '50%',
            }}
          />
        )}
        <div className='flex w-full flex-col sm:flex-row justify-center gap-2'>
          <ButtonPrimary
            type='button'
            clickHandler={handleClose}
            size='sm'
            className='text-neutral-800'
          >
            Cancel
          </ButtonPrimary>
          <ButtonPrimary
            size='sm'
            type='button'
            className='border-2 w-full sm:w-auto transition-colors duration-300 text-teal-400 bg-transparent border-teal-400'
            clickHandler={handleClickChooseFile}
          >
            Browse
          </ButtonPrimary>

          {imgSrc && completedCrop ? (
            <ButtonPrimary
              size='sm'
              type='button'
              className='border-2 transition-colors duration-300 text-white bg-teal-400 hover:bg-teal-500'
              clickHandler={handleUploadAvatar}
              disabled={!completedCrop || isUploading}
            >
              Apply
            </ButtonPrimary>
          ) : null}
        </div>
      </div>
    </LSModal>
  );
};

export default ImageCropper;
