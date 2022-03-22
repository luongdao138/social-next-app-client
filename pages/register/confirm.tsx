import PageWithLayout from 'constants/page';
import ConfirmRegisterContainer from 'containers/ConfirmRegister';
import useRegisterAuth from 'utils/hooks/useRegisterAuth';

const ConfirmEmailPage: PageWithLayout = () => {
  const { render } = useRegisterAuth();

  if (!render) {
    return <></>;
  }

  return <ConfirmRegisterContainer />;
};

export default ConfirmEmailPage;
