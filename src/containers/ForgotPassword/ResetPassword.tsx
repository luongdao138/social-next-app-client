import AuthContainer from 'components/AuthContainer';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import LSInput from 'components/Input';
import LSLoader from 'components/LsLoader';
import { LSRoutes } from 'constants/route.constant';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { MdKeyboardArrowLeft, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { resetPwValidationSchema } from 'utils/validation';
import useResetPassword from './useResetPassword';

interface FormState {
  password: string;
  confirmPw: string;
}

const initialValues: FormState = {
  password: '',
  confirmPw: '',
};

const ResetPasswordContainer = () => {
  const { handleNavigateScreen, meta, onResetPw, user_id, token } = useResetPassword();
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showCfPw, setShowCfPw] = useState<boolean>(false);

  const toggleShowPw = () => {
    setShowPw((prev) => !prev);
  };

  const toggleShowCfPw = () => {
    setShowCfPw((prev) => !prev);
  };

  const showPwIcon = showPw ? (
    <MdVisibility onClick={toggleShowPw} />
  ) : (
    <MdVisibilityOff onClick={toggleShowPw} />
  );

  const showCfPwIcon = showCfPw ? (
    <MdVisibility onClick={toggleShowCfPw} />
  ) : (
    <MdVisibilityOff onClick={toggleShowCfPw} />
  );

  const handleSubmit = (values: FormState) => {
    if (typeof user_id === 'string' && typeof token === 'string') {
      onResetPw({ user_id, token, new_password: values.password });
    }
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
          <h1 className='text-3xl text-center font-semibold text-slate-700 my-5'>
            Reset password success
          </h1>
          <p className='text-center text-slate-600 mb-5'>
            Your password has been reset successfully. You can login now!
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
        <h1 className='text-2xl text-center font-semibold text-slate-700 my-3'>Reset Password</h1>
        <p className='text-center text-slate-600 mb-5'>
          Enter the new password you want to change.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={resetPwValidationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className='w-full'>
              <LSInput
                name='password'
                placeholder='Enter your password'
                label='Password'
                type={showPw ? 'text' : 'password'}
                icon={showPwIcon}
                position='end'
                id='password'
              />
              <div className='mb-6'></div>
              <LSInput
                id='confirmPw'
                name='confirmPw'
                placeholder='Confirm your password'
                label='Confirm password'
                type={showCfPw ? 'text' : 'password'}
                icon={showCfPwIcon}
                position='end'
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

export default ResetPasswordContainer;
