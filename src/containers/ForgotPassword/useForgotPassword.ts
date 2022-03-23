import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { AuthParams } from 'services/auth.service';
import { forgotPassword } from 'store/auth/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import useToast from 'utils/hooks/useToast';

const getForgotPwMeta = createMetaSelector(forgotPassword);

const useForgotPassword = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const meta = useAppSelector(getForgotPwMeta);
  const { addToast } = useToast();
  const [email, setEmail] = useState<string>('');

  const handleNavigateScreen = useCallback(
    (pathname: string) => {
      router.push(pathname, undefined, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(forgotPassword.typePrefix));
    };
  }, [dispatch]);

  useEffect(() => {
    if (meta.error) {
      addToast({ message: meta.error_message || 'Some thing went wrong!', severity: 'error' });
    }
    if (meta.loaded) {
      addToast({ message: 'Check your email to reset the password!', severity: 'success' });
    }
  }, [meta, addToast]);

  const onForgotPw = (params: Pick<AuthParams, 'email'>) => {
    setEmail(params.email || '');
    dispatch(forgotPassword(params));
  };

  return { handleNavigateScreen, meta, onForgotPw, email };
};

export default useForgotPassword;
