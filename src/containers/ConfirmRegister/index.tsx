import AuthContainer from 'components/AuthContainer';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import LSLoader from 'components/LsLoader';
import { LSRoutes } from 'constants/route.constant';
import useConfirmEmail from './useConfirmEmail';

const ConfirmRegisterContainer = () => {
  const { handleNavigateScreen, meta, isSuccess } = useConfirmEmail();

  if (meta.pending || isSuccess === undefined) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <LSLoader />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <AuthContainer>
        <img
          src='https://vi.seaicons.com/wp-content/uploads/2017/03/Sign-Error-icon.png'
          alt='email'
          className='w-32'
        />
        <h1 className='text-2xl text-center font-semibold text-red-500 my-6'>Validation Failed</h1>
        <p className='text-center text-slate-600 mb-6'>
          Oops! There&apos;s something wrong, keep calm and try again!
        </p>

        <div className='w-3/4 bg-gray-300 mb-8' style={{ height: '1px' }}></div>

        <ButtonPrimary
          className='bg-blue-500'
          clickHandler={() => handleNavigateScreen(LSRoutes.REGISTER)}
          size='sm'
        >
          Register now
        </ButtonPrimary>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <img
        src='https://app.sendgrid.com/dist/static/media/party_popper.c0c8accf.svg'
        alt='email'
        className='w-32'
      />
      <h1 className='text-2xl text-center font-semibold text-gray-800 my-6'>
        Account Email Address Confirmed
      </h1>
      <p className='text-center text-slate-600 mb-6'>
        Congratulations! Your account email address has been successfully confirmed.
      </p>

      <div className='w-3/4 bg-gray-300 mb-8' style={{ height: '1px' }}></div>

      <ButtonPrimary
        className='bg-blue-500'
        clickHandler={() => handleNavigateScreen(LSRoutes.LOGIN)}
        size='sm'
      >
        Login now
      </ButtonPrimary>
    </AuthContainer>
  );
};

export default ConfirmRegisterContainer;
