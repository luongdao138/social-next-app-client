import Avatar from 'components/Avatar';
import React from 'react';

interface Props {
  openModal: () => void;
}

const PostInput: React.FC<Props> = ({ openModal }) => {
  return (
    <div
      className='border border-solid border-neutral-300 p-3 sm:p-5 flex gap-2'
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <Avatar
        href='/'
        size={55}
        style={{ minWidth: 40 }}
        src='https://images.unsplash.com/photo-1644982647531-daff2c7383f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60'
        alt='avatar'
      />

      <button
        onClick={openModal}
        className='bg-neutral-100 text-neutral-500 hover:bg-neutral-200 flex-grow rounded-full text-left px-4'
      >
        luongdao, what are you thinking?
      </button>
    </div>
  );
};

export default PostInput;
