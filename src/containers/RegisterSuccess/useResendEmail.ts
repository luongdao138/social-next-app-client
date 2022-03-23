import { clearMetaData } from './../../store/metadata/actions/index';
import { useEffect } from 'react';
import { resendVerifyEmail } from 'store/auth/actions';
import { getEmail } from 'store/auth/selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { createMetaSelector } from 'store/metadata/selectors';
import useToast from 'utils/hooks/useToast';

const getResendEmailMeta = createMetaSelector(resendVerifyEmail);

const useResendEmail = () => {
  const meta = useAppSelector(getResendEmailMeta);
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const email = useAppSelector(getEmail);

  const onResendClick = () => {
    if (email) {
      dispatch(resendVerifyEmail({ email }));
      dispatch(clearMetaData(resendVerifyEmail.typePrefix));
    }
  };

  useEffect(() => {
    if (meta.error) {
      addToast({
        message: meta.error_message || 'Can not send the verify email!',
        severity: 'error',
      });
    } else if (meta.loaded) {
      addToast({ message: 'Resend email success, check your email!', severity: 'success' });
    }
  }, [meta, addToast]);

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(resendVerifyEmail.typePrefix));
    };
  }, [dispatch]);

  return { meta, onResendClick };
};

export default useResendEmail;
