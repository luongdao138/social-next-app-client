import ButtonPrimary from 'components/Button/ButtonPrimary';
import LSInput from 'components/Input';
import LSLoader from 'components/LsLoader';
import LSSelect from 'components/Select';
import { LSRoutes } from 'constants/route.constant';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { UserRegisterParams } from 'services/auth.service';
import { registerValidationSchema } from 'utils/validation';
import useRegisterByEmail from './useRegisterByEmail';

type RegisterFormState = UserRegisterParams & {
  cfPassword: string;
};

const initialValues: RegisterFormState = {
  email: '',
  password: '',
  fullname: '',
  gender: 'male',
  username: '',
  cfPassword: '',
};

export const genderOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const RegisterContainer: React.FC = () => {
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showCfPw, setShowCfPw] = useState<boolean>(false);

  const { registerByMail, meta } = useRegisterByEmail();

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

  const handleSubmit = (values: RegisterFormState) => {
    const { cfPassword, ...data } = values;
    registerByMail(data);
  };

  return (
    <div className='bg-neutral-100 w-full min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-lg mx-auto my-8 px-5 py-14 bg-white border border-solid border-neutral-300'>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registerValidationSchema}
        >
          {(formik) => (
            <Form>
              <h1 className='uppercase text-3xl font-semibold text-center mb-6'>L-Network</h1>
              <div className='flex flex-col gap-5 mb-7'>
                <LSInput name='fullname' placeholder='Enter your full name' label='Full name' />
                <LSInput name='username' placeholder='Enter your username' label='User name' />
                <LSInput name='email' placeholder='Enter your email' label='Email address' />
                <LSInput
                  name='password'
                  placeholder='Enter your password'
                  label='Password'
                  type={showPw ? 'text' : 'password'}
                  icon={showPwIcon}
                  position='end'
                />

                <LSInput
                  name='cfPassword'
                  placeholder='Confirm your password'
                  label='Confirm password'
                  type={showCfPw ? 'text' : 'password'}
                  icon={showCfPwIcon}
                  position='end'
                />
                <LSSelect label='Gender' name='gender' options={genderOptions} />
              </div>
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
                Already have an account?
                <Link href={LSRoutes.LOGIN}>
                  <a className='ml-2 text-red-600 hover:underline'>Login now</a>
                </Link>
              </span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterContainer;
