import Avatar from 'components/Avatar';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import EmojiPicker from 'components/EmojiPicker';
import LSModal from 'components/Modal';
import { BaseEmoji } from 'emoji-mart';
import React, { useEffect, useState } from 'react';
import { IoMdImages } from 'react-icons/io';
import { MdClose, MdOutlineEmojiEmotions, MdCameraAlt } from 'react-icons/md';
import { usePostFormContext } from '../PostFormContext';
import PostImage from './PostImage';
import PostText from './PostText';

interface Props {
  open: boolean;
  onClose: () => void;
}

const PostModal: React.FC<Props> = ({ open, onClose }) => {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const { setStatus, status, postTextRef } = usePostFormContext();

  const handleClose = () => {
    onClose();
  };

  const handleOpenEmoji = () => {
    if (!openEmoji) {
      setOpenEmoji(true);
    }
  };

  const handleCloseEmoji = () => {
    if (openEmoji) {
      setOpenEmoji(false);
    }
  };

  const handleSelect = (e: BaseEmoji) => {
    const inputEl = postTextRef.current;
    if (inputEl) {
      inputEl.focus();
      const start = status.substring(0, inputEl.selectionStart);
      const end = status.substring(inputEl.selectionStart);
      const text = start + e.native + end;
      setStatus(text);
      setCursorPosition(start.length + e.native.length);
    }
  };

  useEffect(() => {
    if (postTextRef.current) {
      postTextRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, postTextRef]);

  useEffect(() => {
    return () => {
      setStatus('');
    };
  }, [setStatus]);

  return (
    <LSModal overflow open={open} maxWidth='xl' fullWidth onBackdropClose onClose={handleClose}>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <span></span>
        <h1 className='font-bold text-xl'>Create Post</h1>
        <span
          className='w-7 h-7 flex rounded-full bg-gray-200 cursor-pointer'
          onClick={handleClose}
        >
          <MdClose className='m-auto text-gray-500 text-lg' />
        </span>
      </div>
      <div className='w-full bg-gray-200 mt-4 mb-4' style={{ height: 1 }}></div>

      {/* Body */}
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
        <div className='h-56 overflow-auto main mb-4'>
          <PostText open={open} />
          <PostImage />
        </div>

        {/* Footer */}
        <div>
          <div
            className='border border-solid border-neutral-300 p-3 sm:p-4 flex justify-between items-center mb-4 rounded-lg'
            style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            <span>Add to your post</span>
            <div className='flex items-center gap-4 text-3xl'>
              {/* <img src='https://img.icons8.com/color/48/000000/picture--v1.png' /> */}
              <IoMdImages className='text-green-500 cursor-pointer' />
              <MdCameraAlt className='cursor-pointer text-red-500' />
              <div className='relative'>
                <MdOutlineEmojiEmotions
                  className='text-orange-400 cursor-pointer'
                  onClick={handleOpenEmoji}
                />
                {openEmoji && (
                  <EmojiPicker handleCloseEmoji={handleCloseEmoji} onSelect={handleSelect} />
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
    </LSModal>
  );
};

export default PostModal;
