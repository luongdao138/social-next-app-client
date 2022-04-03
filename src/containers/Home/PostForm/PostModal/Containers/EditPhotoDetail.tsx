import React, { useEffect, useMemo, useRef, useState } from 'react';
// import Cropper, { CropperProps } from 'react-easy-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { Crop, PercentCrop, PixelCrop } from 'react-image-crop';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdCropRotate, MdOutlineCrop } from 'react-icons/md';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import _ from 'lodash';
import { TABS, usePostFormContext } from 'containers/Home/PostFormContext';
import {
  createPreviewUrl,
  dataURLtoFile,
  destroyPreviewUrl,
} from 'utils/convertToFile';
import { canvasPreview } from 'utils/canvasPreview';
import { v4 as uuidv4 } from 'uuid';

type Mode = 'crop' | 'rotate' | undefined;
type CompletedCrop = {
  percentage: PercentCrop;
  pixel: PixelCrop;
};

const fullCrop: Crop = { unit: '%', x: 0, y: 0, width: 100, height: 100 };

const EditPhotoDetail = () => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<CompletedCrop>();
  const [mode, setMode] = useState<Mode>();
  const [canCrop, setCanCrop] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const {
    changeTab,
    selectedPhoto,
    updateFile,
    handleNextPhoto,
    handlePrevPhoto,
  } = usePostFormContext();
  const [description, setDescription] = useState<string>(
    selectedPhoto?.description || ''
  );
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [rotate, setRotate] = useState;

  const handleCropChange = (crop: PixelCrop, percentageCrop: PercentCrop) => {
    setCrop(percentageCrop);
  };

  const handleChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const resetCrop = () => {
    setCrop(undefined);
    setCompletedCrop(undefined);
    setMode(undefined);
    setCanCrop(false);
  };

  const handlePrevImage = () => {
    resetCrop();
    handlePrevPhoto();
  };

  const handleNextImage = () => {
    resetCrop();
    handleNextPhoto();
  };

  const previewUrl = useMemo(() => {
    if (selectedPhoto?.file) {
      return createPreviewUrl(selectedPhoto.file);
    }
  }, [selectedPhoto]);

  const handleClickCrop = () => {
    setMode('crop');
    setCanCrop(true);

    if (!crop) {
      setCrop(fullCrop);
    } else if (_.isEqual(crop, fullCrop)) {
      setCrop(undefined);
      setCanCrop(false);
    }
  };

  const handleCropComplete = (crop: PixelCrop, percentageCrop: PercentCrop) => {
    setCompletedCrop({ pixel: crop, percentage: percentageCrop });
  };

  const handleCancel = () => {
    changeTab(TABS.EDIT_PHOTOS);
  };

  const handleSave = async () => {
    if (imageRef.current && canvasRef.current && completedCrop) {
      await canvasPreview(
        imageRef.current,
        canvasRef.current,
        completedCrop.pixel
      );
      const canvasDataUrl = canvasRef.current.toDataURL('image/jpeg');
      const newImageFile = await dataURLtoFile(canvasDataUrl, uuidv4());
      if (selectedPhoto) {
        updateFile(selectedPhoto.id, { file: newImageFile, description });
        changeTab(TABS.EDIT_PHOTOS);
      }
    }
  };

  useEffect(() => {
    return () => {
      setTimeout(() => {
        destroyPreviewUrl(previewUrl as string);
      }, 500);
    };
  }, [previewUrl]);

  useEffect(() => {
    setDescription(selectedPhoto?.description || '');
  }, [selectedPhoto]);

  useEffect(() => {
    const desc = description || '';
    const selectedDesc = selectedPhoto?.description || '';
    if (!completedCrop) {
      setIsChanged(desc !== selectedDesc);
    } else {
      setIsChanged(
        desc !== selectedDesc || !_.isEqual(completedCrop.percentage, fullCrop)
      );
    }
  }, [description, selectedPhoto, completedCrop]);

  // const handleClickRotate = () => {
  //   setMode('rotate');
  // };

  if (!selectedPhoto) return <></>;

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-4 flex flex-col'>
        <div className='flex-grow'>
          <textarea
            placeholder='Description'
            className='resize-none h-36 rounded-lg w-full outline-none border border-solid border-neutral-300 py-4 px-5 focus:border-2 focus:border-blue-500'
            // value={image.description}
            // onChange={handleChange}
            value={description}
            onChange={handleChangeDesc}
          />

          <div className='mt-2'>
            <div
              className={`w-full p-3 flex items-center gap-4 cursor-pointer rounded-md transition-all duration-300 ${
                mode === 'crop' ? 'bg-blue-50' : 'hover:bg-gray-100'
              }`}
              onClick={handleClickCrop}
            >
              <span
                className={`w-12 h-12 rounded-full flex ${
                  mode === 'crop' ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <MdOutlineCrop
                  className={`m-auto text-2xl ${
                    mode === 'crop' ? 'text-white' : ''
                  }`}
                />
              </span>
              <span className='text-lg font-medium'>Crop</span>
            </div>
            {/* <div
              className={`w-full p-3 flex items-center gap-4 cursor-pointer rounded-md transition-all duration-300 ${
                mode === 'rotate' ? 'bg-blue-50' : 'hover:bg-gray-100'
              }`}
              onClick={handleClickRotate}
            >
              <span
                className={`w-12 h-12 rounded-full flex ${
                  mode === 'rotate' ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <MdCropRotate
                  className={`m-auto text-2xl ${
                    mode === 'rotate' ? 'text-white' : ''
                  }`}
                />
              </span>
              <span className='text-lg font-medium'>Rotate</span>
            </div> */}
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <ButtonPrimary
            disabled={!isChanged}
            size='sm'
            className={`${
              isChanged ? 'bg-blue-600' : 'bg-gray-200 text-black opacity-50'
            } text-lg font-medium`}
            clickHandler={handleSave}
          >
            Save
          </ButtonPrimary>
          <ButtonPrimary
            size='sm'
            clickHandler={handleCancel}
            className='bg-gray-200 text-lg text-black font-medium'
          >
            Cancel
          </ButtonPrimary>
        </div>
      </div>
      <div
        className='col-span-8 relative bg-cover bg-no-repeat bg-center'
        style={{
          height: '450px',
          backgroundImage: `url("${previewUrl}")`,
        }}
      >
        <div
          className='absolute inset-0 z-10'
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        ></div>
        <ReactCrop
          crop={crop}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
          //   aspect
          keepSelection
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'
          style={{ cursor: 'default' }}
          minWidth={20}
          minHeight={20}
          disabled={!canCrop}
        >
          <img
            src={previewUrl}
            alt=''
            className='max-w-full mx-auto object-cover'
            style={{ maxHeight: '450px' }}
            ref={imageRef}
          />
        </ReactCrop>

        <canvas ref={canvasRef} hidden />

        <div>
          <span
            className='absolute cursor-pointer top-1/2 -translate-y-1/2 left-5 w-12 h-12 rounded-full bg-white flex z-30'
            onClick={handlePrevImage}
          >
            <IoIosArrowBack className='m-auto text-2xl text-gray-500' />
          </span>
          <span
            className='absolute cursor-pointer top-1/2 -translate-y-1/2 right-5 w-12 h-12 rounded-full bg-white flex z-30'
            onClick={handleNextImage}
          >
            <IoIosArrowForward className='m-auto text-2xl text-gray-500' />
          </span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default EditPhotoDetail;
