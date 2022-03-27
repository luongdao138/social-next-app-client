import LSLoader from 'components/LsLoader';
import ProfileInfoContainer from './ProfileInfo';
import useUserData from './useUserData';

const ProfileContainer = () => {
  const {
    profile,
    profileMeta,
    uploadAvatar,
    uploadProgress,
    isUploading,
    removeAvatar,
    setStateFollow,
  } = useUserData();

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
    <div className='max-w-6xl w-full mx-auto mb-5 px-5'>
      <div style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <ProfileInfoContainer
          is_own={!!profile?.is_own}
          uploadAvatar={uploadAvatar}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
          removeAvatar={removeAvatar}
          setStateFollow={setStateFollow}
        />
      </div>
    </div>
  );
};

export default ProfileContainer;
