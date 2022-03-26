import { useCallback, useEffect } from 'react';
import { EditProfileParams } from 'services/profile.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import { actions } from 'store/profile';
import useToast from 'utils/hooks/useToast';

const editProfileMeta = createMetaSelector(actions.updateUserProfile);

const useEditProfile = () => {
  const meta = useAppSelector(editProfileMeta);
  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const clearEditProfileMetadata = useCallback(() => {
    dispatch(clearMetaData(actions.updateUserProfile.typePrefix));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      clearEditProfileMetadata();
    };
  }, [clearEditProfileMetadata, dispatch]);

  const handleUpdateProfile = (params: EditProfileParams) => {
    dispatch(actions.updateUserProfile(params));
  };

  useEffect(() => {
    if (meta.error) {
      addToast({
        message: meta.error_message || 'Something went wrong, try again!',
        severity: 'error',
      });
    } else if (meta.loaded) {
      addToast({
        message: 'Update profile successfully!',
        severity: 'success',
      });
    }
  }, [meta, addToast]);

  return { meta, handleUpdateProfile, clearEditProfileMetadata };
};

export default useEditProfile;
