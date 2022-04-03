import ButtonPrimary from 'components/Button/ButtonPrimary';
import React from 'react';
import { MdClose } from 'react-icons/md';
import useLockScreen from 'utils/hooks/useLockScreen';

interface Props {
  title?: string;
  onCancel: () => void;
  onConfirm: () => void;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  open: boolean;
}

const Confirm: React.FC<Props> = ({
  onCancel,
  onConfirm,
  open,
  cancelText = 'Cancel',
  confirmText = 'Ok',
  description = '',
  title = '',
}) => {
  useLockScreen(open);
  if (!open) return null;

  return (
    <div>
      <div
        className='fixed inset-0 bg-black bg-opacity-70'
        style={{ zIndex: 150 }}
        onClick={onCancel}
      ></div>
      <div
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md max-w-2xl w-full'
        style={{ zIndex: 200, boxShadow: '0 2px 7px rgba(0,0,0,0.2)' }}
      >
        <div className='p-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <span
            className='w-10 h-10 flex rounded-full bg-gray-200 cursor-pointer'
            onClick={onCancel}
          >
            <MdClose className='m-auto text-gray-500 text-2xl' />
          </span>
        </div>

        <div className='w-full bg-gray-200' style={{ height: 1 }}></div>

        <div className='py-3 px-4'>
          <p className='text-lg mb-5'>{description}</p>
          <div className='flex justify-end gap-3'>
            <ButtonPrimary
              size='sm'
              className='text-blue-600 bg-transparent transition-all duration-200 hover:bg-gray-100'
              clickHandler={onCancel}
            >
              {cancelText}
            </ButtonPrimary>
            <ButtonPrimary
              size='sm'
              className='text-white bg-blue-600'
              clickHandler={onConfirm}
            >
              {confirmText}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
