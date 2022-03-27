import EditProfileButton from 'components/EditProfileButton';
import FollowUser from 'components/FollowUser';
import FollowUserButton from 'components/FollowUserButton';
import { MEDIA_QUERY } from 'constants/mediaQuery.constant';
import React from 'react';
import { UserProfile } from 'services/profile.service';
import useMediaQuery from 'utils/hooks/useMediaQuery';

interface Props {
  profile: UserProfile;
  onOpenEdit: () => void;
  setStateFollow: () => void;
  is_own?: boolean;
}

const InfoDetail: React.FC<Props> = ({ profile, onOpenEdit, setStateFollow, is_own }) => {
  const matchSm = useMediaQuery(MEDIA_QUERY.sm);

  return (
    <div className='w-full p-5'>
      <div className={`flex justify-end mb-5`}>
        {/* <h1 className='text-4xl font-medium text-gray-800'>{profile.username}</h1> */}
        {is_own ? (
          <EditProfileButton onOpenEdit={onOpenEdit} />
        ) : (
          <FollowUserButton setStateFollow={setStateFollow} is_followed={!!profile.is_followed} />
        )}
      </div>
      <div
        className='w-full max-w-2xl md:max-w-full flex flex-col gap-2'
        // style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
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
  );
};

export default InfoDetail;
