import React from 'react';
import { ButtonBaseProps } from './type';

type ButtonPrimaryProps = ButtonBaseProps & {};

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  clickHandler = () => {},
  className = '',
  size = 'md',
  fullWidth = false,
  ...rest
}) => {
  let buttonClass = '';

  let rootClass = 'text-center rounded-md text-white flex justify-center items-center';
  let widthClass = fullWidth ? 'w-full' : '';
  let sizeClass = size === 'sm' ? 'px-4 py-2' : size === 'md' ? 'px-6 py-4' : 'px-10 py-6';

  buttonClass = `${rootClass} ${widthClass} ${sizeClass} ${className}`;

  return (
    <button style={{ minWidth: '100px' }} className={buttonClass} onClick={clickHandler} {...rest}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
