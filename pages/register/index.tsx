import PageWithLayout from 'constants/page';
import RegisterContainer from 'containers/Register';
import AuthenticationLayout from 'layouts/AuthenticationLayout';
import React from 'react';

const RegisterPage: PageWithLayout = () => {
  return <RegisterContainer />;
};
RegisterPage.Layout = AuthenticationLayout;

export default RegisterPage;
