import ButtonPrimary from 'components/Button/ButtonPrimary';
import LSInput from 'components/Input';
import { LSRoutes } from 'constants/route.constant';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import { UserLoginParams } from 'services/auth.service';
import { loginValidationSchema } from 'utils/validation';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import useLoginByEmail from './useLoginByEmail';
import LSLoader from 'components/LsLoader';

const initialValues: UserLoginParams = {
  email: '',
  password: '',
};

const LoginContainer: React.FC = () => {
  const [showPw, setShowPw] = useState(false);
  const { loginByEmail, meta, resetMeta, user } = useLoginByEmail();

  const handleSubmit = (values: UserLoginParams) => {
    loginByEmail(values);
  };

  const toggleShowPw = () => {
    setShowPw((prev) => !prev);
  };

  const showPwIcon = showPw ? (
    <MdVisibility onClick={toggleShowPw} />
  ) : (
    <MdVisibilityOff onClick={toggleShowPw} />
  );

  return (
    <div className='bg-neutral-100 w-full h-screen flex items-center justify-center'>
      <div className='w-full max-w-lg mx-auto px-5 py-14 bg-white border border-solid border-neutral-300'>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginValidationSchema}
        >
          {(formik) => (
            <Form>
              <h1 className='uppercase text-3xl font-semibold text-center mb-6'>L-Network</h1>
              <div className='flex flex-col gap-5 mb-7'>
                <LSInput name='email' placeholder='Enter your email' label='Email address' />
                <LSInput
                  name='password'
                  placeholder='Enter your password'
                  label='Password'
                  type={showPw ? 'text' : 'password'}
                  icon={showPwIcon}
                  position='end'
                />
              </div>
              <p className='text-right -mt-3 mb-5 text-blue-500 text-sm font-medium'>
                <Link href={LSRoutes.FORGOT_PASSWORD}>
                  <a className='hover:underline'>Forgot your password?</a>
                </Link>
              </p>
              <ButtonPrimary
                className={`${formik.isValid ? 'bg-neutral-700' : 'bg-neutral-500'}`}
                size='sm'
                fullWidth
                type='submit'
                disabled={!formik.isValid || meta.pending}
              >
                {meta.pending ? <LSLoader size={20} /> : 'Submit'}
              </ButtonPrimary>
              <span className='block mt-3 text-sm sm:text-base'>
                You don&apos;t have a account
                <Link href={LSRoutes.REGISTER}>
                  <a className='ml-2 text-red-600 hover:underline'>Register now</a>
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginContainer;
