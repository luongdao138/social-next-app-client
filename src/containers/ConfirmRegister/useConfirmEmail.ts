import { LSRoutes } from 'constants/route.constant';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { verifyEmail } from 'store/auth/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import useToast from 'utils/hooks/useToast';

const getVerifyEmailMetadata = createMetaSelector(verifyEmail);

const useConfirmEmail = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);

  const router = useRouter();
  const { addToast } = useToast();
  const { verifyToken } = router.query;
  const dispatch = useAppDispatch();
  const meta = useAppSelector(getVerifyEmailMetadata);

  const handleNavigateScreen = useCallback(
    (pathname: string) => {
      router.push(pathname, undefined, { shallow: true });
    },
    [router]
  );

  useEffect(() => {
    if (verifyToken) {
      dispatch(verifyEmail({ token: verifyToken as string }));
    }
  }, [verifyToken, dispatch]);

  useEffect(() => {
    if (meta.error) {
      if (meta.error_message === 'Email already confirmed!') {
        addToast({ message: 'Email aready confirmed!', severity: 'success' });
        handleNavigateScreen(LSRoutes.LOGIN);
      } else {
        addToast({ message: 'Email validation failed!', severity: 'error' });
        setIsSuccess(false);
      }
    } else if (meta.loaded) {
      addToast({ message: 'Email validation success!', severity: 'success' });
      setIsSuccess(true);
    }
  }, [dispatch, meta, router, handleNavigateScreen, addToast]);

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(verifyEmail.typePrefix));
    };
  }, [dispatch]);

  return { meta, isSuccess, handleNavigateScreen };
};

export default useConfirmEmail;
