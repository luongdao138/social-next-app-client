import ButtonPrimary from 'components/Button/ButtonPrimary';
import React from 'react';

interface Props {
  onOpenEdit: () => void;
}

const EditProfileButton: React.FC<Props> = ({ onOpenEdit }) => {
  return (
    <div className='w-full flex justify-center mt-12 sm:mt-0 sm:justify-end'>
      <ButtonPrimary
        size='sm'
        className='border-2 border-solid border-teal-400 text-teal-400 transition-colors duration-300 hover:text-white hover:bg-teal-400 '
        // fullWidth
        clickHandler={onOpenEdit}
      >
        Edit Profile
      </ButtonPrimary>
    </div>
  );
};

export default EditProfileButton;
