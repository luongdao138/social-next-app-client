import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FcAddImage } from 'react-icons/fc';
import { MdClose, MdEdit } from 'react-icons/md';
import { createPreviewUrl } from 'utils/convertToFile';
import { fileTypes, TABS, usePostFormContext } from '../../../PostFormContext';
import classes from './PostImage.module.css';
import { v4 as uuidv4 } from 'uuid';
interface Props {
  onClose: () => void;
}

const PostImage: React.FC<Props> = ({ onClose }) => {
  const [isDragEnter, setIsDragEnter] = useState<boolean>(false);
  const { addFile, images, resetFiles, changeTab } = usePostFormContext();
  const hasImage = !!images?.length;

  const onDrop = (files: File[]) => {
    setIsDragEnter(false);
    const newFiles = files.map((file) => ({ id: uuidv4(), file }));
    addFile(newFiles);
  };
  const { getInputProps, getRootProps, inputRef } = useDropzone({
    onDrop,
    accept: fileTypes,
    maxSize: 5 * 1024 * 1024,
    onDragEnter: (e) => setIsDragEnter(true),
    onDragLeave: (e) => setIsDragEnter(false),
    noClick: hasImage,
  });

  const handleAddMoreImage = () => {
    inputRef.current?.click();
  };

  const handleOpenEdit = () => {
    changeTab(TABS.EDIT_PHOTOS);
  };

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    resetFiles();
    onClose();
  };

  return (
    <div className='relative'>
      <div className='p-2 border border-solid border-neutral-300 rounded-lg'>
        <div
          {...getRootProps({
            className: `bg-gray-100 rounded-lg p-2 hover:bg-gray-200 flex flex-col justify-center items-center relative ${classes.wrapper}`,
            draggable: true,
            style: { minHeight: '144px' },
          })}
        >
          {hasImage ? (
            <div className='absolute left-4 top-4 flex items-center gap-2'>
              <div
                className={`flex items-center gap-2 bg-white p-2 rounded-md ${classes.addBtn}`}
                onClick={handleOpenEdit}
              >
                <MdEdit className='text-2xl' />
                <span className='font-medium'>
                  {images.length > 1 ? 'Edit all' : 'Edit'}
                </span>
              </div>
              <div
                className={`flex items-center gap-2 bg-white p-2 rounded-md ${classes.addBtn}`}
                onClick={handleAddMoreImage}
              >
                <FcAddImage className='text-2xl' />
                <span className='font-medium'>Add more</span>
              </div>
            </div>
          ) : null}
          <span
            onClick={handleClose}
            className='w-7 h-7 flex rounded-full z-10 border border-solid border-neutral-300 bg-white cursor-pointer absolute top-4 right-4'
          >
            <MdClose className='m-auto text-gray-500 text-lg' />
          </span>
          {isDragEnter && !hasImage ? (
            <div className='min-h-36'>
              <span className='text-lg'>Drop your image here</span>
            </div>
          ) : !hasImage ? (
            <>
              <input {...getInputProps()} />
              <span className='w-10 h-10 flex rounded-full bg-zinc-300'>
                <FcAddImage className='m-auto text-xl' />
              </span>
              <span className='text-lg font-medium'>Add image/video</span>
              <span className='text-sm'>or drag and drop</span>
            </>
          ) : (
            <div className='w-full grid grid-cols-2 gap-2'>
              <input {...getInputProps()} />
              {images.slice(0, 4).map((image, index) => (
                <div key={index}>
                  <img
                    src={createPreviewUrl(image.file)}
                    alt=''
                    className='h-36 w-full object-cover'
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {images && images.length > 4 ? (
        <span className='absolute bottom-10 right-10 z-10 text-white text-4xl font-bold'>
          + {images.length - 4}
        </span>
      ) : null}
    </div>
  );
};

export default PostImage;
