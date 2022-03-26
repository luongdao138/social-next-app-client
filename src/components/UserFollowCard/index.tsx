import Avatar from 'components/Avatar';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import { LSRoutes } from 'constants/route.constant';
import React from 'react';
import { FollowUserParams, UserFollow } from 'services/profile.service';

interface Props {
  user: UserFollow;
  handleFollow: (params: FollowUserParams) => void;
}

const UserFollowCard: React.FC<Props> = ({ user, handleFollow }: Props) => {
  const is_followed = user.is_followed;
  const followClass = !is_followed
    ? 'border-teal-400 text-teal-400 hover:bg-teal-400'
    : 'border-red-400 text-red-400 hover:bg-red-400';
  return (
    <div className='flex items-center justify-between p-2'>
      <div className='flex items-center gap-3'>
        <Avatar
          style={{ minWidth: 50 }}
          src={user.avatar || ''}
          size={50}
          isLink
          href={LSRoutes.PROFILE_DETAIL.replace(/:id/gi, user._id)}
        />
        <div>
          <p className='text-lg font-medium text-teal-400'>{user.username}</p>
          <p className='text-gray-500'>{user.fullname}</p>
        </div>
      </div>
      {!user.is_own && (
        <ButtonPrimary
          size='sm'
          className={`w-14 border-2 border-solid transition-colors duration-300 hover:text-white ${followClass}`}
          fullWidth
          clickHandler={() =>
            handleFollow({ user_id: user._id, type: user.is_followed ? 'unfollow' : 'follow' })
          }
        >
          {is_followed ? 'Unfollow' : 'Follow'}
        </ButtonPrimary>
      )}
    </div>
  );
};

export default UserFollowCard;
