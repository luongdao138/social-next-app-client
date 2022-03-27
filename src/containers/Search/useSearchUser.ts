import { useCallback } from 'react';
import { FollowUserParams } from 'services/profile.service';
import * as services from 'services/search.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import { actions, selectors } from 'store/search';

const useSearchUser = () => {
  const createSearchSelector = createMetaSelector(actions.searchUsers);
  const searchMeta = useAppSelector(createSearchSelector);
  const pageMeta = useAppSelector(selectors.getSearchMeta);
  const users = useAppSelector(selectors.getSearchData);
  const dispatch = useAppDispatch();

  const fetchUsers = useCallback(
    (params: services.SearchParams) => {
      dispatch(actions.searchUsers(params));
    },
    [dispatch]
  );

  const resetMeta = useCallback(() => {
    dispatch(clearMetaData(actions.searchUsers.typePrefix));
  }, [dispatch]);

  const followUser = (params: FollowUserParams) => {
    dispatch(actions.followUsers(params));
  };

  const unfollowUser = (params: FollowUserParams) => {
    dispatch(actions.unfollowUsers(params));
  };

  return {
    searchMeta,
    pageMeta,
    users,
    fetchUsers,
    resetMeta,
    followUser,
    unfollowUser,
  };
};

export default useSearchUser;
