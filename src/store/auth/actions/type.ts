export enum AUTH_ACTION_TYPE {
  LOGIN_BY_EMAIL = 'auth/loginByEmail',
  REGISTER_BY_EMAIL = 'auth/registerByEmail',
  VERIFY_EMAIL = 'auth/verifyEmail',
  LOGOUT = 'auth/logout',
  RESEND_VERIFY_EMAIL = 'auth/resendVerifyEmail',
  FORGOT_PASSWORD = 'auth/forgotPassword',
  RESET_PASSWORD = 'auth/resetPassword',
  UPDATE_PROFILE = 'auth/updateProfile',
}
