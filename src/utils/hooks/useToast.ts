import { useAppDispatch } from 'store/hooks';
import { actions } from 'store/common';
import { AddToastParams } from 'store/common/reducers';
import { useCallback } from 'react';

const useToast = () => {
  const dispatch = useAppDispatch();
  const addToast = useCallback(
    (data: AddToastParams) => {
      dispatch(actions.addToast(data));
    },
    [dispatch]
  );

  const removeToast = useCallback(
    (id: string) => {
      dispatch(actions.removeToast(id));
    },
    [dispatch]
  );

  return { addToast, removeToast };
};

export default useToast;
