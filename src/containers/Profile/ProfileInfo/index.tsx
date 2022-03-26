import EditProfileButton from 'components/EditProfileButton';
import FollowUser from 'components/FollowUser';
import FollowUserButton from 'components/FollowUserButton';
import LSModal from 'components/Modal';
import ProfileCover from 'components/ProfileCover';
import React, { useCallback, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { getUserProfile } from 'store/profile/selectors';
import EditProfileForm from './EditProfile';
import ImageCropper from './ImageCropper';
import 'react-image-crop/dist/ReactCrop.css';
import { COMMON } from 'constants/comon';
import { UploadImageResponse } from 'services/image.service';

interface Props {
  is_own: boolean;
  uploadAvatar: (file: File, cb?: (res: UploadImageResponse) => void) => void;
  uploadProgress: number;
  isUploading?: boolean;
  removeAvatar: () => void;
  setStateFollow: () => void;
}

const ProfileInfoContainer: React.FC<Props> = ({
  is_own,
  uploadProgress,
  uploadAvatar,
  isUploading,
  removeAvatar,
  setStateFollow,
}) => {
  const profile = useAppSelector(getUserProfile);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openCropper, setOpenCropper] = useState<boolean>(false);

  const originalImage = profile?.avatar === COMMON.DEFAULT_IMAGE ? undefined : profile?.avatar;

  const handleOpenEdit = useCallback(() => {
    setOpenEdit(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const handleOpenCropper = () => {
    setOpenCropper(true);
  };

  if (!profile) return <></>;

  return (
    <div className='w-full max-w-4xl mx-auto flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-8'>
      <LSModal open={openEdit} onClose={handleCloseEdit} onBackdropClose fullWidth maxWidth='xl'>
        <EditProfileForm onClose={handleCloseEdit} />
      </LSModal>
      <ProfileCover
        openCropper={handleOpenCropper}
        is_own={is_own}
        avatar={profile.avatar as string}
        removeAvatar={removeAvatar}
      />
      {is_own && (
        <ImageCropper
          open={openCropper}
          onClose={() => setOpenCropper(false)}
          originalImage={originalImage}
          uploadAvatar={uploadAvatar}
          uploadProgress={uploadProgress}
          isUploading={isUploading}
        />
      )}
      <div className='w-full'>
        <div className='flex flex-col gap-4 items-center md:flex-row md:justify-between'>
          <h1 className='text-4xl  font-medium text-gray-800'>{profile.username}</h1>
          {is_own ? (
            <EditProfileButton onOpenEdit={handleOpenEdit} />
          ) : (
            <FollowUserButton setStateFollow={setStateFollow} is_followed={!!profile.is_followed} />
          )}
        </div>
        <div
          className='w-full max-w-2xl md:max-w-full rounded-md p-5 mx-auto flex flex-col gap-2 mt-4'
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <div className='flex justify-between gap-4 sm:justify-center md:justify-start'>
            <FollowUser
              user_id={profile._id}
              follow_count={profile.follower_count || 0}
              type='follower'
            />
            <FollowUser
              user_id={profile._id}
              follow_count={profile.following_count || 0}
              type='following'
            />
          </div>

          <p>
            <span className='mr-2 text-gray-800 font-medium'>Full name:</span>
            <span className='text-neutral-500'>{profile.fullname}</span>
          </p>
          {profile.mobile && (
            <p>
              <span className='mr-2 text-gray-800 font-medium'>Mobile:</span>
              <span className='text-red-500 font-medium'>{profile.mobile}</span>
            </p>
          )}
          {profile.address && (
            <p className='text-neutral-500'>
              <span className='mr-2 text-gray-800 font-medium'>Address:</span>
              <span>{profile.address}</span>
            </p>
          )}
          <p>
            <span className='mr-2 text-gray-800 font-medium'>Email:</span>
            <span className='text-neutral-500'>{profile.email}</span>
          </p>
          {profile.website && (
            <a href='/'>
              <span className='mr-2 font-medium'>Website:</span>
              <span className='text-blue-500 underline'>{profile.website}</span>
            </a>
          )}
          {profile.story && (
            <p>
              <span className='mr-2 font-medium'>Story:</span>
              <span className='text-neutral-500 '>{profile.story}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoContainer;
