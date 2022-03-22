import LSLoader from 'components/LsLoader';
import React from 'react';
import useLockScreen from 'utils/hooks/useLockScreen';
// import ReactDOM from 'react-dom'

interface Props {
  open: boolean;
}

const FullScreenLoader: React.FC<Props> = ({ open }) => {
  useLockScreen(open);

  if (!open) {
    return null;
  }

  return (
    <div className='fixed z-50 bg-black opacity-60 inset-0 flex items-center justify-center'>
      <LSLoader />
    </div>
  );
};

export default FullScreenLoader;
