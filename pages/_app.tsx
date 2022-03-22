import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageWithLayout from 'constants/page';
import { createWrapper } from 'next-redux-wrapper';
import React from 'react';
import { applyInterceptor } from 'services/interceptor';
import LSHead from 'components/LSHead';
import { useStore } from 'react-redux';
import makeStore, { StoreType } from 'store/store';
import { useRouter } from 'next/router';
import Script from 'next/script';
import FullScreenLoader from 'components/FullScreenLoader';
import ToastContainer from 'containers/ToastContainer';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

type Props = AppProps & {
  Component: PageWithLayout;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  // loading state when users navigate between pages
  const [loader, setLoader] = React.useState<boolean>(false);
  const store: StoreType = useStore();
  const router = useRouter();

  const Layout = Component.Layout ?? React.Fragment;
  applyInterceptor(store);

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

  return (
    <>
      <LSHead title={pageProps.title || 'L-Network'} />
      <Script src='https://kit.fontawesome.com/a076d05399.js' />
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <FullScreenLoader open={loader} />
          <ToastContainer position='top-right' autoClose autoCloseTime={2000} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default createWrapper(makeStore).withRedux(MyApp);
