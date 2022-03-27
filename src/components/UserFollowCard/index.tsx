import Avatar from 'components/Avatar';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import { MEDIA_QUERY } from 'constants/mediaQuery.constant';
import { LSRoutes } from 'constants/route.constant';
import React from 'react';
import { FollowUserParams, UserFollow } from 'services/profile.service';
import useMediaQuery from 'utils/hooks/useMediaQuery';

interface Props {
  user: UserFollow;
  handleFollow: (params: FollowUserParams) => void;
}

const UserFollowCard: React.FC<Props> = ({ user, handleFollow }: Props) => {
  const is_followed = user.is_followed;
  const followClass = !is_followed
    ? 'border-teal-400 text-teal-400 hover:bg-teal-400'
    : 'border-red-400 text-red-400 hover:bg-red-400';
  const responsiveClass = ` px-2 py-1 text-sm md:px-4 md:py-2 md:text-base `;
  const matchesXs = useMediaQuery(MEDIA_QUERY.xs);

  return (
    <div className='flex items-center justify-between p-2 gap-2'>
      <div className='flex items-center gap-2'>
        <Avatar
          style={{ minWidth: !matchesXs ? 32 : 50 }}
          src={user.avatar || ''}
          size={!matchesXs ? 32 : 50}
          isLink
          href={LSRoutes.PROFILE_DETAIL.replace(/:id/gi, user._id)}
        />
        <div>
          <p className='text-sm sm:text-base font-medium text-teal-400'>
            {user.username.length > 10
              ? !matchesXs
                ? `${user.username.slice(0, 10)}...`
                : user.username
              : user.username}
          </p>
          <p className='text-sm md:text-base text-gray-500'>
            {user.fullname.length > 10
              ? !matchesXs
                ? `${user.fullname.slice(0, 10)}...`
                : user.fullname
              : user.fullname}
          </p>
        </div>
      </div>
      {!user.is_own && (
        <ButtonPrimary
          size='sm'
          className={`w-14 border-2 border-solid transition-colors duration-300 hover:text-white ${followClass} ${responsiveClass}`}
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
