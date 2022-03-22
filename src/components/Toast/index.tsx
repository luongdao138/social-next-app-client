import React from 'react';
import { Toast } from 'store/common/reducers';
import { FaExclamationTriangle, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { RiFolderWarningFill, RiCloseFill } from 'react-icons/ri';
import classes from './Toast.module.css';

interface Props {
  toast: Toast;
  removeToast: () => void;
  containerPosition: string;
}

const Toast: React.FC<Props> = ({ toast, removeToast, containerPosition }) => {
  const getClassName = () => {
    switch (toast.severity) {
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-600';
      case 'info':
        return 'bg-blue-500';

      default:
        return 'bg-grey-500';
    }
  };

  const renderIcon = () => {
    switch (toast.severity) {
      case 'success':
        return <FaCheck />;
      case 'warning':
        return <RiFolderWarningFill />;
      case 'error':
        return <FaExclamationTriangle />;
      case 'info':
        return <FaInfoCircle />;

      default:
        return <></>;
    }
  };

  return (
    <div
      className={`${classes.toast} ${
        classes[containerPosition]
      } flex items-center justify-between gap-4 mb-3 p-4 shadow-md rounded-md w-96 text-neutral-100  ${getClassName()}`}
    >
      <span className='text-xl'>{renderIcon()}</span>
      <span>{toast.message}</span>
      <RiCloseFill className='text-xl cursor-pointer ml-2' onClick={removeToast} />
    </div>
  );
};

export default Toast;
