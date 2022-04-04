import { MEDIA_QUERY } from 'constants/mediaQuery.constant';
import React from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';

const ProfileCover = () => {
  const matchXs = useMediaQuery(MEDIA_QUERY.xs);
  return (
    <div className='w-full'>
      <img
        src='https://images.unsplash.com/reserve/vNE8214NS9GOvXOy7DCu_DSC_0266.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
        alt='cover'
        className={`w-full ${matchXs ? 'max-h-80' : 'max-h-72'} max-h-80 object-cover`}
      />
    </div>
  );
};

export default ProfileCover;
