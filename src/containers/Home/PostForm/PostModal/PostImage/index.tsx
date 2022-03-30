import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FcAddImage } from 'react-icons/fc';
import { MdClose } from 'react-icons/md';
import { usePostFormContext } from '../../PostFormContext';
import classes from './PostImage.module.css';
interface Props {
  onClose: () => void;
}

const fileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const PostImage: React.FC<Props> = ({ onClose }) => {
  const [isDragEnter, setIsDragEnter] = useState<boolean>(false);
  const { addFile, files, previewSrc, resetFiles } = usePostFormContext();
  const hasImage = !!previewSrc.length;

  const onDrop = (files: File[]) => {
    setIsDragEnter(false);
    addFile(files);
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

  const handleClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    resetFiles();
    onClose();
  };

  return (
    <div>
      <div className='p-2 border border-solid border-neutral-300 rounded-lg'>
        <div
          {...getRootProps({
            className: `bg-gray-100 rounded-lg p-2 hover:bg-gray-200 flex flex-col justify-center items-center min-h-36 relative ${classes.wrapper}`,
            draggable: true,
          })}
          // className='h-36'
        >
          {hasImage ? (
            <div
              className={`absolute left-2 top-2 flex items-center gap-2 bg-white p-2 rounded-md ${classes.addBtn}`}
              onClick={handleAddMoreImage}
            >
              <FcAddImage />
              <span className='font-medium'>Add image/video</span>
            </div>
          ) : null}
          <span
            onClick={handleClose}
            className='w-7 h-7 flex rounded-full z-10 border border-solid border-neutral-300 bg-white cursor-pointer absolute top-2 right-2'
          >
            <MdClose className='m-auto text-gray-500 text-lg' />
          </span>
          {isDragEnter && !hasImage ? (
            <>
              <span className='text-lg'>Drop your image here</span>
            </>
          ) : !previewSrc.length ? (
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
              {previewSrc.map((image, index) => (
                <div key={index}>
                  <img src={image} alt='' className='h-36 w-full object-cover' />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostImage;
