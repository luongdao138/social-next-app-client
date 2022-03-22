import { LSRoutes } from 'constants/route.constant';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { UserRegisterParams } from 'services/auth.service';
import { actions, selectors } from 'store/auth';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import useToast from 'utils/hooks/useToast';

const registerMetaSelector = createMetaSelector(actions.registerByEmail);

const useRegisterByEmail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const meta = useAppSelector(registerMetaSelector);
  const user = useAppSelector(selectors.getUserAuth);
  const { addToast } = useToast();

  const registerByMail = (params: UserRegisterParams) => {
    dispatch(actions.registerByEmail(params));
  };

  const resetMeta = useCallback(() => {
    dispatch(clearMetaData(actions.registerByEmail.typePrefix));
  }, [dispatch]);

  useEffect(() => {
    if (meta.loaded) {
      resetMeta();
      router.push(LSRoutes.REGISTER_CONFIRM, undefined, { shallow: true });
      const timeoutId = setTimeout(() => {
        addToast({ message: 'Verify your email to complete registration!', severity: 'success' });
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [meta.loaded, resetMeta, router, addToast]);

  useEffect(() => {
    if (meta.error) {
      addToast({ message: meta.error_message || 'Something went wrong', severity: 'error' });
      resetMeta();
    }
  }, [meta.error, addToast, meta.error_message, resetMeta]);

  return {
    user,
    meta,
    registerByMail,
    resetMeta,
  };
};

export default useRegisterByEmail;
