import PageWithLayout from 'constants/page';
import ForgotPasswordContainer from 'containers/ForgotPassword';
import AuthenticationLayout from 'layouts/AuthenticationLayout';
import React from 'react';

const ForgotPasswordPage: PageWithLayout = () => {
  return (
    <AuthenticationLayout>
      <ForgotPasswordContainer />
    </AuthenticationLayout>
  );
};

export default ForgotPasswordPage;
