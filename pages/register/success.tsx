import RegisterSuccessContainer from 'containers/RegisterSuccess';
import React from 'react';
import useRegisterAuth from 'utils/hooks/useRegisterAuth';

const RegisterSuccess = () => {
  const { render } = useRegisterAuth();

  if (!render) return <></>;

  return <RegisterSuccessContainer />;
};

export default RegisterSuccess;
