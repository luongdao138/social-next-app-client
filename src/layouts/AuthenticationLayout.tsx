import { LSRoutes } from 'constants/route.constant';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { getAuthenticated } from 'store/auth/selectors';
import { useAppSelector } from 'store/hooks';

interface Props {
  children: React.ReactNode;
}

const AuthenticationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(getAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(LSRoutes.HOME, undefined, { shallow: true });
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};

export default AuthenticationLayout;
