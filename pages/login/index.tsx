import PageWithLayout from 'constants/page';
import LoginContainer from 'containers/Login';
import AuthenticationLayout from 'layouts/AuthenticationLayout';
import React from 'react';

const LoginPage: PageWithLayout = () => {
  return <LoginContainer />;
};

LoginPage.Layout = AuthenticationLayout;

export default LoginPage;
