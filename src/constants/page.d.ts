import AuthenticationLayout from 'layouts/AuthenticationLayout';
import MainLayout from 'layouts/MainLayout';
import { NextPage } from 'next';

type PageWithMainLayout = NextPage & {
  Layout?: typeof MainLayout;
};

type PageWithAuthenticationLayout = NextPage & {
  Layout?: typeof AuthenticationLayout;
};

type PageWithLayout = PageWithMainLayout | PageWithAuthenticationLayout;

export default PageWithLayout;
