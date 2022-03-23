import { LSRoutes } from 'constants/route.constant';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getHasEmail, getIsRegistered } from 'store/auth/selectors';
import { useAppSelector } from 'store/hooks';

const useRegisterAuth = () => {
  // const isAuthenticated = useAppSelector(getAuthenticated);
  const isRegistered = useAppSelector(getIsRegistered);
  const hasEmail = useAppSelector(getHasEmail);
  const router = useRouter();
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    if (isRegistered) {
      console.log('Already registered!');
      router.push(LSRoutes.HOME);
    } else {
      if (!hasEmail) {
        router.push(LSRoutes.LOGIN);
      } else {
        setRender(true);
      }
    }
  }, [router, isRegistered, hasEmail]);

  return { render };
};

export default useRegisterAuth;
