import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageWithLayout from 'constants/page';
import storeWrapper from 'store';
import React from 'react';
import { applyInterceptor } from 'services/interceptor';
import LSHead from 'components/LSHead';
import { useStore } from 'react-redux';
import { StoreType } from 'store/store';

type Props = AppProps & {
  Component: PageWithLayout;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  const store: StoreType = useStore();

  const Layout = Component.Layout ?? React.Fragment;
  applyInterceptor(store);

  return (
    <>
      <LSHead title={pageProps.title || 'L-Network'} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default storeWrapper.withRedux(MyApp);
