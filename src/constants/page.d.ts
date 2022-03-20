import MainLayout from 'layouts/MainLayout';
import { NextPage } from 'next';

type PageWithMainLayout = NextPage & {
  Layout: typeof MainLayout;
};

type PageWithLayout = PageWithMainLayout;

export default PageWithLayout;
