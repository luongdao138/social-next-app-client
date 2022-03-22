import { useRouter } from 'next/router';
import React from 'react';

const ConfirmRegisterContainer = () => {
  const router = useRouter();
  console.log(router.query);

  return <div>ConfirmRegisterContainer</div>;
};

export default ConfirmRegisterContainer;
