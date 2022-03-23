import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ResetPasswordParams } from 'services/auth.service';
import { resetPassword } from 'store/auth/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import useToast from 'utils/hooks/useToast';

const getResetPwMeta = createMetaSelector(resetPassword);

const useResetPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const meta = useAppSelector(getResetPwMeta);
  const { addToast } = useToast();
  const { id, token } = router.query;

  const handleNavigateScreen = useCallback(
    (pathname: string) => {
      router.push(pathname, undefined, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(resetPassword.typePrefix));
    };
  }, [dispatch]);

  useEffect(() => {
    if (meta.error) {
      addToast({ message: meta.error_message || 'Some thing went wrong!', severity: 'error' });
    }
    if (meta.loaded) {
      addToast({ message: 'Reset password successfully!', severity: 'success' });
    }
  }, [meta, addToast]);

  const onResetPw = (params: ResetPasswordParams) => {
    dispatch(resetPassword(params));
  };

  return { handleNavigateScreen, meta, onResetPw, user_id: id, token };
};

export default useResetPassword;
