import Avatar from 'components/Avatar';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import EmojiPicker from 'components/EmojiPicker';
import { BaseEmoji } from 'emoji-mart';
import React from 'react';
import { IoMdImages } from 'react-icons/io';
import { MdCameraAlt, MdOutlineEmojiEmotions } from 'react-icons/md';
import PostImage from '../PostImage';
import PostText from '../PostText';

interface Props {
  open: boolean;
  openImage: boolean;
  openEmoji: boolean;
  handleCloseImage: () => void;
  handleOpenImage: () => void;
  handleOpenCamera: () => void;
  handleOpenEmoji: () => void;
  handleCloseEmoji: () => void;
  handleSelect: (e: BaseEmoji) => void;
}

const Main: React.FC<Props> = ({
  open,
  openImage,
  handleCloseImage,
  handleOpenImage,
  handleCloseEmoji,
  handleOpenCamera,
  handleOpenEmoji,
  handleSelect,
  openEmoji,
}) => {
  return (
    <div>
      {/* User */}
      <div className='flex items-center gap-2 mb-4'>
        <Avatar
          href='/'
          size={42}
          style={{ minWidth: 42 }}
          src='https://images.unsplash.com/photo-1644982647531-daff2c7383f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60'
          alt='avatar'
        />
        <div>
          <span className='font-medium text-neutral-700'>Luong Dao</span>
        </div>
      </div>

      {/* Main */}
      <div className='h-56 pr-1 overflow-auto main mb-4'>
        <PostText open={open} />
        {openImage && <PostImage onClose={handleCloseImage} />}
      </div>

      {/* Footer */}
      <div>
        <div
          className='border border-solid border-neutral-300 p-3 sm:p-4 flex justify-between items-center mb-4 rounded-lg'
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          <span>Add to your post</span>
          <div className='flex items-center gap-4 text-3xl'>
            <IoMdImages
              className='text-green-500 cursor-pointer'
              onClick={handleOpenImage}
            />
            <MdCameraAlt
              className='cursor-pointer text-red-500'
              onClick={handleOpenCamera}
            />
            <div className='relative'>
              <MdOutlineEmojiEmotions
                className='text-orange-400 cursor-pointer'
                onClick={handleOpenEmoji}
              />
              {openEmoji && (
                <EmojiPicker
                  handleCloseEmoji={handleCloseEmoji}
                  onSelect={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
        <ButtonPrimary
          fullWidth
          size='sm'
          className='bg-blue-500 text-lg font-semibold hover:bg-blue-600 rounded-lg'
        >
          Post
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default React.memo(Main);
