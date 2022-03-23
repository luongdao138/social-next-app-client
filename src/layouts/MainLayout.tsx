import FullScreenLoader from 'components/FullScreenLoader';
import { LSRoutes } from 'constants/route.constant';
import { useRouter } from 'next/router';
import { getAuthenticated } from 'store/auth/selectors';
import { useAppSelector } from 'store/hooks';
import useIsoMorphicLayoutEffect from 'utils/hooks/useIsomorphicLayoutEffect';
import useNavigationLoader from 'utils/hooks/useNavigationLoader';
import Header from './Header';

interface Props {
  children: React.ReactNode;
  loginRequired?: boolean;
}

const MainLayout: React.FC<Props> = ({ children, loginRequired }) => {
  const isAuthenticated = useAppSelector(getAuthenticated);
  const router = useRouter();
  const { loader } = useNavigationLoader();

  useIsoMorphicLayoutEffect(() => {
    if (loginRequired && !isAuthenticated) {
      router.push(LSRoutes.LOGIN);
    }
  }, [loginRequired, isAuthenticated, router]);

  if (loader) return <></>;

  return !isAuthenticated && loginRequired ? (
    <>
      <FullScreenLoader open />
    </>
  ) : (
    <div className='w-full mx-auto max-w-6xl'>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
