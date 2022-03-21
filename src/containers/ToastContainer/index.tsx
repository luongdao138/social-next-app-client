import Toast from 'components/Toast';
import React, { useEffect } from 'react';
import { selectors } from 'store/common';
import { useAppSelector } from 'store/hooks';
import useToast from 'utils/hooks/useToast';

interface Props {
  autoClose?: boolean;
  autoCloseTime?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const ToastContainer: React.FC<Props> = ({
  autoClose = false,
  autoCloseTime = 2000,
  position = 'top-right',
}) => {
  const toasts = useAppSelector(selectors.getToasts);
  const { removeToast } = useToast();
  const positionClass = () => {
    switch (position) {
      case 'top-left':
        return 'top-3 left-3';

      case 'top-right':
        return 'top-3 right-3';

      case 'bottom-left':
        return 'bottom-3 left-3';

      case 'bottom-right':
        return 'bottom-3 right-3';

      default:
        return '';
    }
  };

  useEffect(() => {
    if (!autoClose) return;

    const timeoutId = setTimeout(() => {
      if (toasts.length) removeToast(toasts[toasts.length - 1].id);
    }, autoCloseTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [removeToast, toasts, autoClose, autoCloseTime]);

  return (
    <div className={`fixed ${positionClass()} z-50`}>
      {toasts.length
        ? toasts.map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              removeToast={() => removeToast(toast.id)}
              containerPosition={position}
            />
          ))
        : null}
    </div>
  );
};

export default ToastContainer;
