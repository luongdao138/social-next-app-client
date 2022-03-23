import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Email is not valid!').required('Email is required!'),
  password: Yup.string()
    .required('Password is required!')
    .min(6, 'Password must be between 6 and 30 characters!')
    .max(30, 'Password must be between 6 and 30 characters!'),
});

export const forgotPwValidationSchema = Yup.object({
  email: Yup.string().email('Email is not valid!').required('Email is required!'),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string().email('Email is not valid!').required('Email is required!'),
  password: Yup.string()
    .required('Password is required!')
    .min(6, 'Password must be between 6 and 30 characters!')
    .max(30, 'Password must be between 6 and 30 characters!'),
  fullname: Yup.string()
    .required('Full name is required!')
    .max(25, 'Full name can not be more than 25 characters!'),
  username: Yup.string()
    .required('User name is required!')
    .max(25, 'User name can not be more than 25 characters!'),
  cfPassword: Yup.string()
    .required('Confirm password is required!')
    .when('password', (password, schema) => {
      if (password) {
        return schema.oneOf([password], 'Password must match!');
      }
    }),
});

export const resetPwValidationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required!')
    .min(6, 'Password must be between 6 and 30 characters!')
    .max(30, 'Password must be between 6 and 30 characters!'),
  confirmPw: Yup.string()
    .required('Confirm password is required!')
    .when('password', (password, schema) => {
      if (password) {
        return schema.oneOf([password], 'Password must match!');
      }
    }),
});
