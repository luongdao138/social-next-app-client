import EditProfileButton from 'components/EditProfileButton';
import FollowUser from 'components/FollowUser';
import FollowUserButton from 'components/FollowUserButton';
import ProfileCover from 'components/ProfileCover';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { getUserProfile } from 'store/profile/selectors';

interface Props {
  is_own: boolean;
}

const ProfileInfoContainer: React.FC<Props> = ({ is_own }) => {
  const profile = useAppSelector(getUserProfile);

  if (!profile) return <></>;

  return (
    <div className='w-full max-w-4xl mx-auto flex flex-col gap-4 items-center md:flex-row md:items-start md:gap-8'>
      <ProfileCover avatar={profile.avatar as string} />
      <div>
        <div className='flex flex-col gap-4 items-center md:flex-row md:justify-between'>
          <h1 className='text-4xl  font-medium text-gray-800'>luongdao</h1>
          {is_own ? <EditProfileButton /> : <FollowUserButton />}
        </div>
        <div
          className='w-full max-w-2xl md:max-w-full rounded-md p-5 mx-auto flex flex-col gap-2 mt-4'
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <div className='flex justify-between gap-4 sm:justify-center md:justify-start'>
            <FollowUser />
            <FollowUser />
          </div>

          <p>
            <span className='mr-2 text-gray-800 font-medium'>Full name:</span>
            <span className='text-neutral-500'>{profile.fullname}</span>
          </p>
          <p>
            <span className='mr-2 text-gray-800 font-medium'>Mobile:</span>
            <span className='text-red-500 font-medium'>{profile.mobile}</span>
          </p>
          <p className='text-neutral-500'>
            <span className='mr-2 text-gray-800 font-medium'>Address:</span>
            <span>{profile.address}</span>
          </p>
          <p>
            <span className='mr-2 text-gray-800 font-medium'>Email:</span>
            <span className='text-neutral-500'>{profile.email}</span>
          </p>
          <a href='/'>
            <span className='mr-2 font-medium'>Website:</span>
            <span className='text-blue-500 underline'>{profile.website}</span>
          </a>
          <p>
            <span className='mr-2 font-medium'>Story:</span>
            <span className='text-neutral-500 '>{profile.story}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoContainer;
