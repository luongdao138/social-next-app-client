import LSModal from 'components/Modal';
import React, { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { List, InfiniteLoader } from 'react-virtualized';

interface Props {
  user_id: string;
  follow_count: number;
  type: 'following' | 'follower';
}

const FollowUser: React.FC<Props> = ({ follow_count, type, user_id }) => {
  const [open, setOpen] = useState<boolean>(false);
  const hasNextPage = true;

  const handleCloseModal = () => {
    setOpen(false);
  };

  const loadMore = () => {
    if (hasNextPage) {
      // load more users
    }
  };

  const Header = ({ title }: { title: string }) => {
    return (
      <div className='flex items-center gap-4'>
        <div
          className='w-8 h-8 flex bg-neutral-600 cursor-pointer rounded-full hover:bg-neutral-500 transition-colors'
          onClick={handleCloseModal}
        >
          <IoMdArrowBack className='m-auto text-gray-300 text-xl' />
        </div>
        <span className='text-xl font-medium text-gray-700'>{title}</span>
      </div>
    );
  };

  return (
    <div>
      <span
        className='text-teal-500 font-medium hover:underline cursor-pointer'
        onClick={() => setOpen(true)}
      >
        {follow_count}{' '}
        {type === 'follower' ? (follow_count > 1 ? 'Followers' : 'Follower') : 'Following'}
      </span>
      <LSModal fullWidth maxWidth='2xl' open={open} onClose={() => setOpen(false)}>
        <Header title={type === 'follower' ? 'Followers' : 'Following'} />

        {/* <InfiniteLoader
          isRowLoaded={(index) => users.length}
          itemCount={ite}
        >

        </InfiniteLoader> */}
      </LSModal>
    </div>
  );
};

export default FollowUser;
