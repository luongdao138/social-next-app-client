import ButtonPrimary from 'components/Button/ButtonPrimary';
import FullScreenLoader from 'components/FullScreenLoader';
import { LSRoutes } from 'constants/route.constant';
import { useRouter } from 'next/router';
import React from 'react';
import { getEmail } from 'store/auth/selectors';
import { useAppSelector } from 'store/hooks';
import useResendEmail from './useResendEmail';

const RegisterSuccessContainer = () => {
  const email = useAppSelector(getEmail);
  const router = useRouter();

  const { meta, onResendClick } = useResendEmail();

  const handleNavigateRegister = () => {
    router.push(LSRoutes.REGISTER, undefined, { shallow: true });
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <FullScreenLoader open={meta.pending} />
      <div className='w-full max-w-xl mx-auto  p-5 md:shadow-xl md:border md:border-gray-200 rounded-lg flex flex-col items-center'>
        <img src='https://pngimg.com/uploads/email/email_PNG22.png' alt='email' className='w-60' />
        <h1 className='text-2xl text-center md:text-4xl font-semibold text-gray-800 mb-5'>
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
          <span className='text-blue-400 cursor-pointer font-medium' onClick={onResendClick}>
            Resend confirmation mail
          </span>
        </p>
        <ButtonPrimary className='bg-blue-500 mt-5' clickHandler={handleNavigateRegister} size='sm'>
          Back to register
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default RegisterSuccessContainer;
