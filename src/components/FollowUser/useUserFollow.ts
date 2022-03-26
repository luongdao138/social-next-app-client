import { FollowUserParams, GetFollowParams } from 'services/profile.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import { selectors, actions } from 'store/profile';

const useUserFollow = (type: 'follower' | 'following') => {
  const dispatch = useAppDispatch();
  const isFollower = type === 'follower';

  // select data
  const users = useAppSelector(
    isFollower ? selectors.getUserFollowers : selectors.getUserFollowing
  );
  const pageMeta = useAppSelector(
    isFollower ? selectors.getUserFollowersMeta : selectors.getUserFollowingMeta
  );

  const createFollowMeta = isFollower
    ? createMetaSelector(actions.getUserFollowers)
    : createMetaSelector(actions.getUserFollowing);
  const meta = useAppSelector(createFollowMeta);

  // actions
  const fetchUsers = isFollower
    ? (params: GetFollowParams) => {
        dispatch(actions.getUserFollowers(params));
      }
    : (params: GetFollowParams) => {
        dispatch(actions.getUserFollowing(params));
      };
  const clearUsers = isFollower
    ? () => {
        dispatch(actions.clearUserFollowers);
      }
    : () => {
        dispatch(actions.clearUserFollowing);
      };

  const followUser = (params: FollowUserParams) => {
    dispatch(actions.followUserFromList(params));
  };

  const unfollowUser = (params: FollowUserParams) => {
    dispatch(actions.unFollowUserFromList(params));
  };

  const resetMeta = isFollower
    ? () => {
        dispatch(clearMetaData(actions.getUserFollowers.typePrefix));
      }
    : () => {
        dispatch(clearMetaData(actions.getUserFollowing.typePrefix));
      };

  return {
    users,
    fetchUsers,
    clearUsers,
    followUser,
    unfollowUser,
    pageMeta,
    meta,
    resetMeta,
  };
};

export default useUserFollow;
