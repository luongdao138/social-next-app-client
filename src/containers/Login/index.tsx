import ButtonPrimary from 'components/Button/ButtonPrimary';
import LSInput from 'components/Input';
import { LSRoutes } from 'constants/route.constant';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import { UserLoginParams } from 'services/auth.service';
import * as Yup from 'yup';

const initialValues: UserLoginParams = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Email is not valid!').required('Email is required!'),
  password: Yup.string()
    .required('Password is required!')
    .min(6, 'Password must be between 6 and 30 characters!'),
});

const LoginContainer: React.FC = () => {
  const handleSubmit = (values: UserLoginParams) => {
    console.log(values);
  };

  return (
    <div className='bg-neutral-100 w-full h-screen flex items-center justify-center'>
      <div className='w-full max-w-lg mx-auto px-5 py-14 bg-white border border-solid border-neutral-300'>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
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
                  type='password'
                />
              </div>
              <ButtonPrimary
                className={`${formik.isValid ? 'bg-neutral-700' : 'bg-neutral-500'}`}
                size='sm'
                fullWidth
                type='submit'
                disabled={!formik.isValid}
              >
                Submit
              </ButtonPrimary>
              <span className='block mt-3 text-sm sm:text-base'>
                You don&apos;t have a account
                <Link href={LSRoutes.REGISTER}>
                  <a className='ml-2 text-red-600 hover:underline'>Register now</a>
                </Link>
              </span>
              {/* {JSON.stringify(formik.values)} */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginContainer;
