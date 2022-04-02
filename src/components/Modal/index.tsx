import React from 'react';
import useLockScreen from 'utils/hooks/useLockScreen';

interface Props {
  open?: boolean;
  onClose?: () => void;
  fullWidth?: boolean;
  maxWidth?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl';
  onBackdropClose?: boolean;
  overflow?: boolean;
}

const LSModal: React.FC<Props> = ({
  open,
  maxWidth,
  onClose,
  children,
  fullWidth,
  onBackdropClose,
  overflow,
}) => {
  useLockScreen(open);
  const handleClose = () => {
    if (onBackdropClose) {
      onClose && onClose();
    }
  };

  return (
    <div
      className={`fixed z-40 transition-all ease-in-out duration-150 inset-0 ${
        open ? 'opacity-100 visible' : 'opacity-0 hidden'
      }`}
    >
      <div
        className={`transition-all ease-in-out duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 hidden'
        } fixed bg-black bg-opacity-50 inset-0 flex items-center justify-center overflow-visible`}
        onClick={handleClose}
      ></div>
      <div className='h-full flex items-center justify-center'>
        <div
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxHeight: 'calc(100vh - 64px)',
          }}
          className={`${
            open ? 'opacity-100 visible' : 'opacity-0 hidden'
          }  transition-all duration-500 rounded-md relative m-5 ${
            overflow ? 'visible' : 'overflow-y-auto'
          } max-w-${maxWidth || 'xs'} ${
            fullWidth ? 'w-full' : ''
          } p-5 bg-white`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LSModal;
