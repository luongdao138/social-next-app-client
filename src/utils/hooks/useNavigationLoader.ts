import { useRouter } from 'next/router';
import React from 'react';

const useNavigationLoader = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = () => {
      setLoader(false);
    };

    router.events.on('routeChangeStart', () => {
      setLoader(true);
    });

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return { loader };
};

export default useNavigationLoader;
