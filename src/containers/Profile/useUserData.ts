import { COMMON } from 'constants/comon';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UploadImageResponse } from 'services/image.service';
import { updateProfile } from 'store/auth/actions';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import { actions, selectors } from 'store/profile';
import useUploadImage from 'utils/hooks/useUploadImage';

const getUserProfileMeta = createMetaSelector(actions.getUserProfile);

const useUserData = () => {
  const router = useRouter();
  let user_id = router.query.id
    ? typeof router.query.id === 'string'
      ? router.query.id
      : router.query.id[0]
    : '';
  const profile = useAppSelector(selectors.getUserProfile);
  const dispatch = useAppDispatch();
  const profileMeta = useAppSelector(getUserProfileMeta);
  const { progress, hasError, uploadResult, uploadImage, isUploading } = useUploadImage();

  const uploadAvatar = (file: File, cb?: (res: UploadImageResponse) => void) => {
    uploadImage(file, (res) => {
      dispatch(
        actions.updateUserProfile({
          avatar: res.secure_url,
        })
      );
      if (profile) {
        dispatch(updateProfile({ ...profile, avatar: res.secure_url }));
      }
      cb && cb(res);
    });
  };

  const removeAvatar = () => {
    dispatch(
      actions.updateUserProfile({
        avatar: COMMON.DEFAULT_IMAGE,
      })
    );
    if (profile) {
      dispatch(updateProfile({ ...profile, avatar: COMMON.DEFAULT_IMAGE }));
    }
  };

  const setStateFollow = () => {
    if (profile) {
      if (profile.is_followed) {
        dispatch(actions.unfollowUser({ type: 'unfollow', user_id }));
      } else {
        dispatch(actions.followUser({ type: 'follow', user_id }));
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      dispatch(actions.getUserProfile(user_id));
    }
  }, [user_id, dispatch, router.isReady]);

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(actions.getUserProfile.typePrefix));
      dispatch(actions.clearUserProfile());
    };
  }, [dispatch]);

  return {
    profileMeta,
    profile,
    uploadAvatar,
    uploadProgress: progress,
    isUploading,
    removeAvatar,
    setStateFollow,
  };
};

export default useUserData;
