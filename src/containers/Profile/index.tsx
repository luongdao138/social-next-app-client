import LSLoader from 'components/LsLoader';
import ProfileInfoContainer from './ProfileInfo';
import useUserData from './useUserData';

const ProfileContainer = () => {
  const { profile, profileMeta } = useUserData();

  const Loader = () => {
    return (
      <div className='w-full h-full mt-32 flex items-center justify-center'>
        <LSLoader />
      </div>
    );
  };

  if (profileMeta.pending) {
    return <Loader />;
  }

  return (
    <div className='max-w-6xl w-full mx-auto px-5 py-6'>
      <ProfileInfoContainer is_own={!!profile?.is_own} />
    </div>
  );
};

export default ProfileContainer;
