import LSModal from 'components/Modal';
import ProfileAvatar from 'components/ProfileAvatar';
import ProfileCover from 'components/ProfileCover';
import { COMMON } from 'constants/comon';
import React, { useCallback, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { UploadImageResponse } from 'services/image.service';
import { useAppSelector } from 'store/hooks';
import { getUserProfile } from 'store/profile/selectors';
import EditProfileForm from './EditProfile';
import ImageCropper from './ImageCropper';
import InfoDetail from './InfoDetail';

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
    <>
      {/* <div className='w-full max-w-4xl mx-auto flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-8'> */}
      <div className='w-full'>
        <div className='w-full relative flex flex-col items-center'>
          <ProfileCover />
          <ProfileAvatar
            openCropper={handleOpenCropper}
            is_own={is_own}
            avatar={profile.avatar as string}
            removeAvatar={removeAvatar}
          />
        </div>
        <div>
          <InfoDetail
            onOpenEdit={handleOpenEdit}
            profile={profile}
            setStateFollow={setStateFollow}
            is_own={is_own}
          />
        </div>
      </div>
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
      <LSModal open={openEdit} onClose={handleCloseEdit} onBackdropClose fullWidth maxWidth='xl'>
        <EditProfileForm onClose={handleCloseEdit} />
      </LSModal>
    </>
  );
};

export default ProfileInfoContainer;
