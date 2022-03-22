import { LSRoutes } from 'constants/route.constant';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { UserLoginParams } from 'services/auth.service';
import { actions, selectors } from 'store/auth';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import useToast from 'utils/hooks/useToast';

const loginMetaSelector = createMetaSelector(actions.loginByEmail);

const useLoginByEmail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const meta = useAppSelector(loginMetaSelector);
  const user = useAppSelector(selectors.getUserAuth);
  const { addToast } = useToast();

  const loginByEmail = (params: UserLoginParams) => {
    dispatch(actions.loginByEmail(params));
  };

  const resetMeta = useCallback(() => {
    dispatch(clearMetaData(actions.loginByEmail.typePrefix));
  }, [dispatch]);

  useEffect(() => {
    if (meta.loaded) {
      resetMeta();
      router.push(LSRoutes.HOME, undefined, { shallow: true });
      setTimeout(() => {
        addToast({ message: 'Login sucess!', severity: 'success' });
      }, 1000);
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
    loginByEmail,
    resetMeta,
  };
};

export default useLoginByEmail;
