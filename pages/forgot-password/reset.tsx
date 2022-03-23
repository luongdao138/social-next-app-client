import PageWithLayout from 'constants/page';
import ResetPasswordContainer from 'containers/ForgotPassword/ResetPassword';
import AuthenticationLayout from 'layouts/AuthenticationLayout';

const ResetPasswordPage: PageWithLayout = () => {
  return (
    <AuthenticationLayout>
      <ResetPasswordContainer />
    </AuthenticationLayout>
  );
};

export default ResetPasswordPage;
