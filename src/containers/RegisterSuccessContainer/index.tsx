import React from 'react';
import { getEmail } from 'store/auth/selectors';
import { useAppSelector } from 'store/hooks';

const RegisterSuccessContainer = () => {
  const email = useAppSelector(getEmail);

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-xl mx-auto  p-5 md:shadow-xl md:border md:border-gray-200 rounded-lg flex flex-col items-center'>
        <img src='https://pngimg.com/uploads/email/email_PNG22.png' alt='email' className='w-60' />
        <h1 className='text-2xl  md:text-4xl font-semibold text-gray-800 mb-5'>
          Email Confirmation
        </h1>
        <p className='text-center text-slate-600 mb-5'>
          We have sent email to <span className='text-orange-400 font-medium'>{email}</span> to
          confirm the validity of our email address. After receicing the email follow the link
          provided to complete your registration.
        </p>

        <div className='w-3/4 bg-gray-300 mb-5' style={{ height: '1px' }}></div>

        <p className='text-center text-slate-600'>
          If you not got any email{' '}
          <span className='text-blue-400 cursor-pointer font-medium'>Resend confirmation mail</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterSuccessContainer;
