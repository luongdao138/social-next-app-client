import FullScreenLoader from 'components/FullScreenLoader';
import { LSRoutes } from 'constants/route.constant';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAuthenticated } from 'store/auth/selectors';
import { useAppSelector } from 'store/hooks';
import useNavigationLoader from 'utils/hooks/useNavigationLoader';

interface Props {
  children: React.ReactNode;
}

const AuthenticationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(getAuthenticated);
  const { loader } = useNavigationLoader();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(LSRoutes.HOME, undefined, { shallow: true });
    }
  }, [isAuthenticated, router]);

  return loader ? null : <>{children}</>;
};

export default AuthenticationLayout;
