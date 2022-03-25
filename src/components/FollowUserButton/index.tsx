import ButtonPrimary from 'components/Button/ButtonPrimary';
import React from 'react';

interface Props {
  is_followed: boolean;
}

const FollowUserButton: React.FC<Props> = ({ is_followed }) => {
  return (
    <div className='w-full max-w-xs'>
      <ButtonPrimary
        size='sm'
        className='border-2 w-full border-solid border-teal-400 text-teal-400 transition-colors duration-300 hover:text-white hover:bg-teal-400'
        fullWidth
      >
        {is_followed ? 'Unfollow' : 'Follow'}
      </ButtonPrimary>
    </div>
  );
};

export default FollowUserButton;
