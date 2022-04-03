import { useState } from 'react';
// import Cropper, { CropperProps } from 'react-easy-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { Crop, PercentCrop, PixelCrop } from 'react-image-crop';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdCropRotate, MdOutlineCrop } from 'react-icons/md';
import ButtonPrimary from 'components/Button/ButtonPrimary';

type Mode = 'crop' | 'rotate' | undefined;

const EditPhotoDetail = () => {
  const [crop, setCrop] = useState<Crop>();
  const [mode, setMode] = useState<Mode>();
  const [canCrop, setCanCrop] = useState<boolean>(false);
  // const [rotate, setRotate] = useState;

  const handleCropChange = (crop: PixelCrop, percentageCrop: PercentCrop) => {
    setCrop(percentageCrop);
  };

  const handleClickCrop = () => {
    setMode('crop');
    setCanCrop(true);
    setCrop({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
  };

  const handleClickRotate = () => {
    setMode('rotate');
  };

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-4 flex flex-col'>
        <div className='flex-grow'>
          <textarea
            placeholder='Description'
            className='resize-none h-36 rounded-lg w-full outline-none border border-solid border-neutral-300 py-4 px-5 focus:border-2 focus:border-blue-500'
            // value={image.description}
            // onChange={handleChange}
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
            <div
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
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <ButtonPrimary size='sm' className='bg-blue-600 text-lg font-medium'>
            Save
          </ButtonPrimary>
          <ButtonPrimary
            size='sm'
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
          backgroundImage:
            'url("https://images.unsplash.com/photo-1648881008216-f07dd67fd8a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60")',
        }}
      >
        <div
          className='absolute inset-0 z-10'
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        ></div>
        <ReactCrop
          crop={crop}
          onChange={handleCropChange}
          //   aspect
          //   keepSelection
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 origin-center rotate-90'
          style={{ cursor: 'default' }}
          minWidth={20}
          minHeight={20}
          disabled={!canCrop}
        >
          <img
            src='https://images.unsplash.com/photo-1648881008216-f07dd67fd8a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60'
            alt=''
            className='max-w-full h-full object-cover'
            style={{ maxHeight: '450px' }}
          />
        </ReactCrop>

        <div>
          <span className='absolute cursor-pointer top-1/2 -translate-y-1/2 left-5 w-12 h-12 rounded-full bg-white flex z-30'>
            <IoIosArrowBack className='m-auto text-2xl text-gray-500' />
          </span>
          <span className='absolute cursor-pointer top-1/2 -translate-y-1/2 right-5 w-12 h-12 rounded-full bg-white flex z-30'>
            <IoIosArrowForward className='m-auto text-2xl text-gray-500' />
          </span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default EditPhotoDetail;
