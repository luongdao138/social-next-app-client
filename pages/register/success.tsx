import RegisterSuccessContainer from 'containers/RegisterSuccessContainer';
import React from 'react';
import useRegisterAuth from 'utils/hooks/useRegisterAuth';

const RegisterSuccess = () => {
  const { render } = useRegisterAuth();

  if (!render) return <></>;

  return <RegisterSuccessContainer />;
};

export default RegisterSuccess;
