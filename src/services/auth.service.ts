export interface UserLoginParams {
  email: string;
  password: string;
}

export interface UserRegisterParams {
  username: string;
  fullname: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
}
