import ButtonPrimary from 'components/Button/ButtonPrimary';
import React from 'react';

interface Props {
  is_followed: boolean;
  setStateFollow: () => void;
}

const FollowUserButton: React.FC<Props> = ({ is_followed, setStateFollow }) => {
  const followClass = !is_followed
    ? 'border-teal-400 text-teal-400 hover:bg-teal-400'
    : 'border-red-400 text-red-400 hover:bg-red-400';

  return (
    <div className='w-full flex justify-center mt-12 sm:mt-0 sm:justify-end'>
      <ButtonPrimary
        size='sm'
        className={`border-2 border-solid transition-colors duration-300 hover:text-white ${followClass}`}
        clickHandler={setStateFollow}
      >
        {is_followed ? 'Unfollow' : 'Follow'}
      </ButtonPrimary>
    </div>
  );
};

export default FollowUserButton;
