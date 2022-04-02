import ButtonPrimary from 'components/Button/ButtonPrimary';
import PhotoEditItem from 'components/PhotoEditItem';
import { fileTypes, usePostFormContext } from 'containers/Home/PostFormContext';
import React, { useEffect, useRef, useState } from 'react';
import { FcAddImage } from 'react-icons/fc';
import { FileItem } from 'services/postForm.service';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  handleBack: () => void;
}

const EditPhoto: React.FC<Props> = ({ handleBack }) => {
  const { images, updateImages } = usePostFormContext();
  const [tempImages, setTempImages] = useState<FileItem[]>(images || []);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChooseImage = () => {
    inputRef.current?.click();
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) =>
      fileTypes.includes(file.type)
    );
    const newImages: FileItem[] = validFiles.map((file) => ({
      id: uuidv4(),
      file,
    }));
    setTempImages(_.concat(tempImages, newImages));
  };

  const handleChangeImage = (imageId: string, data: Partial<FileItem>) => {
    let newImages = _.clone(tempImages);
    newImages = newImages.map((image) =>
      image.id === imageId ? { ...image, ...data } : image
    );
    setTempImages(newImages);
  };

  const handleRemoveImage = (imageId: string) => {
    let newImages = _.clone(tempImages);
    newImages = newImages.filter((image) => image.id !== imageId);
    setTempImages(newImages);
  };

  const handleSave = () => {
    updateImages(tempImages);
    handleBack();
  };

  useEffect(() => {
    return handleBack;
  }, [handleBack]);

  return (
    <div>
      <input
        type='file'
        multiple
        hidden
        ref={inputRef}
        onChange={handleAddImage}
      />
      {tempImages.length ? (
        <div
          style={{ maxHeight: '420px' }}
          className='overflow-y-auto gap-3 grid grid-cols-1 md:grid-cols-2 p-2'
        >
          {tempImages.map((image) => (
            <PhotoEditItem
              key={image.id}
              image={image}
              handleChangeImage={handleChangeImage}
              handleRemoveImage={handleRemoveImage}
            />
          ))}
        </div>
      ) : (
        <div className='w-full flex flex-col items-center'>
          <img
            src='https://www.facebook.com/images/comet/empty_states_icons/media/null_states_media_gray_wash.svg'
            alt=''
            className='w-32'
          />
          <p className='text-xl text-gray-500'>Add image to start</p>

          <div
            className='w-full bg-gray-200 mt-6'
            style={{ height: '1px' }}
          ></div>
        </div>
      )}

      <div className='flex flex-row justify-end items-center gap-3 mt-4'>
        <ButtonPrimary
          className='bg-transparent text-lg font-semibold transition-all duration-200 rounded-lg text-blue-600 hover:bg-gray-100 flex items-center gap-2'
          size='sm'
          style={{ minWidth: '120px' }}
          clickHandler={handleChooseImage}
        >
          <FcAddImage className='text-2xl' />
          <span>Add image</span>
        </ButtonPrimary>
        <ButtonPrimary
          className='bg-blue-500 text-lg font-semibold hover:bg-blue-600 rounded-lg'
          size='sm'
          style={{ minWidth: '120px' }}
          clickHandler={handleSave}
        >
          Save
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default EditPhoto;
