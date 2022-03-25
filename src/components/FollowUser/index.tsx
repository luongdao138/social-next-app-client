import React from 'react';

interface Props {
  user_id: string;
  follow_count: number;
  type: 'following' | 'follower';
}

const FollowUser: React.FC<Props> = ({ follow_count, type, user_id }) => {
  return (
    <div>
      <span className='text-teal-500 font-medium hover:underline cursor-pointer'>
        {follow_count}{' '}
        {type === 'follower' ? (follow_count > 1 ? 'Followers' : 'Follower') : 'Following'}
      </span>
    </div>
  );
};

export default FollowUser;
