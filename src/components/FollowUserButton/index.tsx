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
    <div className='w-full max-w-xs'>
      <ButtonPrimary
        size='sm'
        className={`border-2 w-full border-solid transition-colors duration-300 hover:text-white ${followClass}`}
        fullWidth
        clickHandler={setStateFollow}
      >
        {is_followed ? 'Unfollow' : 'Follow'}
      </ButtonPrimary>
    </div>
  );
};

export default FollowUserButton;
