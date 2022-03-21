import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthenticationLayout: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AuthenticationLayout;
