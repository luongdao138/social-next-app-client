import React, { useEffect, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { FileItem } from 'services/postForm.service';
import classes from './PhotoEditItem.module.css';

interface Props {
  image: FileItem;
  handleChangeImage: (imageId: string, data: Partial<FileItem>) => void;
  handleRemoveImage: (imageId: string) => void;
  handleSelectPhoto: (imageId: string) => void;
}

const PhotoEditItem: React.FC<Props> = ({
  image,
  handleChangeImage,
  handleRemoveImage,
  handleSelectPhoto,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      setPreviewUrl(fileReader.result as string);
    });
    fileReader.readAsDataURL(image.file);
  }, [image]);

  if (!previewUrl) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeImage(image.id, { description: e.target.value });
  };

  return (
    <div
      className={`w-full rounded-lg relative overflow-hidden ${classes.container}`}
      style={{ boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)' }}
    >
      <div className={classes.action}>
        <div
          className='cursor-pointer absolute left-4 top-4 flex items-center gap-1 z-20 p-2 bg-white rounded-md'
          onClick={() => {
            handleSelectPhoto(image.id);
          }}
        >
          <MdEdit className='text-xl' />
          <span className='font-medium'>Edit</span>
        </div>
        <span
          onClick={() => handleRemoveImage(image.id)}
          className='w-7 h-7 flex rounded-full z-10 border border-solid border-neutral-300 bg-white cursor-pointer absolute top-4 right-4'
        >
          <MdClose className='m-auto text-gray-500 text-lg' />
        </span>
      </div>
      <div className='w-full h-44 relative overflow-hidden rounded-tl-lg rounded-tr-lg'>
        <div
          style={{
            backgroundImage: `url("${previewUrl}")`,
          }}
          className='h-full bg-cover bg-no-repeat bg-center blur-xl'
        ></div>
        <img
          src={previewUrl || ''}
          alt=''
          className='h-full max-w-full absolute left-1/2 z-10 top-0 bottom-0 -translate-x-1/2 object-cover'
        />
      </div>
      <div className='bg-white p-2'>
        <textarea
          placeholder='Description'
          className='resize-none h-24 rounded-lg w-full outline-none border border-solid border-neutral-300 py-4 px-5 focus:border-2 focus:border-blue-500'
          value={image.description}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PhotoEditItem;
