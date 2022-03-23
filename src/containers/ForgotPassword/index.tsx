import AuthContainer from 'components/AuthContainer';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import LSInput from 'components/Input';
import LSLoader from 'components/LsLoader';
import { LSRoutes } from 'constants/route.constant';
import { Form, Formik } from 'formik';
import React from 'react';
import { MdEmail, MdKeyboardArrowLeft } from 'react-icons/md';
import { AuthParams } from 'services/auth.service';
import { forgotPwValidationSchema } from 'utils/validation';
import useForgotPassword from './useForgotPassword';

const initialValues: AuthParams = {
  email: '',
};

const ForgotPasswordContainer = () => {
  const { handleNavigateScreen, meta, onForgotPw, email } = useForgotPassword();

  const handleSubmit = (values: AuthParams) => {
    onForgotPw({ email: values.email });
  };

  const BackButton = () => (
    <ButtonPrimary
      clickHandler={() => handleNavigateScreen(LSRoutes.LOGIN)}
      size='sm'
      className='mt-6 text-neutral-500 text-sm font-medium'
    >
      <MdKeyboardArrowLeft className='text-lg mr-1' />
      <span>Back to login</span>
    </ButtonPrimary>
  );

  if (meta.loaded) {
    return (
      <AuthContainer>
        <div className='w-full py-6 max-w-md mx-auto flex flex-col items-center'>
          <img
            src='https://cdn-icons-png.flaticon.com/512/6195/6195700.png'
            alt='forgot-password'
            className='w-32'
          />
          <h1 className='text-3xl text-center font-semibold text-slate-700 my-5'>Password reset</h1>
          <p className='text-center text-slate-600 mb-5'>
            An email with a password reset link has been sent to your email: {email}
          </p>
          <p className='text-center text-slate-600'>
            Check your email and click on the link to proceed!
          </p>
          <BackButton />
        </div>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <div className='w-full py-6 max-w-md mx-auto flex flex-col items-center'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/6195/6195700.png'
          alt='forgot-password'
          className='w-32'
        />
        <h1 className='text-2xl text-center font-semibold text-slate-700 my-3'>Forgot Password</h1>
        <p className='text-center text-slate-600 mb-5'>
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={forgotPwValidationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className='w-full'>
              <LSInput
                name='email'
                icon={<MdEmail />}
                position='start'
                placeholder='Enter your email'
              />
              <div className='mb-6'></div>
              <ButtonPrimary
                className={`${formik.isValid ? 'bg-blue-500' : 'bg-blue-300'}`}
                size='sm'
                fullWidth
                type='submit'
                disabled={!formik.isValid || meta.pending}
              >
                {meta.pending ? <LSLoader size={20} /> : 'Submit'}
              </ButtonPrimary>
            </Form>
          )}
        </Formik>

        <BackButton />
      </div>
    </AuthContainer>
  );
};

export default ForgotPasswordContainer;
