import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PageWithLayout from 'constants/page';
import storeWrapper from 'store';

type Props = AppProps & {
  Component: PageWithLayout;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />;
}

export default storeWrapper.withRedux(MyApp);
