import Toast from 'components/Toast';
import React, { useEffect } from 'react';
import { selectors } from 'store/common';
import { useAppSelector } from 'store/hooks';
import useToast from 'utils/hooks/useToast';

const ToastContainer = () => {
  const toasts = useAppSelector(selectors.getToasts);
  const { removeToast } = useToast();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (toasts.length) removeToast(toasts[toasts.length - 1].id);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [removeToast, toasts]);

  return (
    <div className='fixed top-2.5 right-2.5 z-50'>
      {toasts.length
        ? toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} removeToast={() => removeToast(toast.id)} />
          ))
        : null}
    </div>
  );
};

export default ToastContainer;
