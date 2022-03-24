import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import { actions, selectors } from 'store/profile';
import useToast from 'utils/hooks/useToast';

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
  const { addToast } = useToast();
  const profileMeta = useAppSelector(getUserProfileMeta);

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

  return { profileMeta, profile };
};

export default useUserData;
