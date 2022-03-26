import LSModal from 'components/Modal';
import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { UserFollow } from 'services/profile.service';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import UserFollowCard from 'components/UserFollowCard';
import classes from './FollowUser.module.css';
import LSLoader from 'components/LsLoader';
import useUserFollow from './useUserFollow';

interface Props {
  user_id: string;
  follow_count: number;
  type: 'following' | 'follower';
}

// async function getRandomData(): Promise<UserFollow[]> {
//   return new Promise<UserFollow[]>((resolve) => {
//     setTimeout(() => {
//       resolve(
//         [...new Array<UserFollow>(10)].map(() => ({
//           _id: uuidv4(),
//           fullname: faker.name.findName(),
//           username: faker.name.firstName().toLowerCase(),
//           avatar: faker.image.avatar(),
//           is_followed: Math.random() > 0.5,
//           is_following: true,
//         }))
//       );
//     }, 2000);
//   });
// }

const FollowUser: React.FC<Props> = ({ follow_count, type, user_id }) => {
  const { clearUsers, fetchUsers, followUser, meta, pageMeta, resetMeta, unfollowUser, users } =
    useUserFollow(type);

  const [open, setOpen] = useState<boolean>(false);
  // const [users, setUsers] = useState<UserFollow[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalPage, setTotalPage] = useState<number>(10);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const hasNextPage = currentPage < totalPage;
  // const itemCount = hasNextPage ? users.length + 1 : users.length;
  const hasNextPage = pageMeta && pageMeta.current_page < pageMeta.total_pages;
  const itemCount = users ? (hasNextPage ? users?.length + 1 : users?.length) : 0;

  const handleCloseModal = () => {
    setOpen(false);
  };

  // const fetchUsers = useCallback(async ({ page }: { page: number }) => {
  //   console.log(`Call API with page = ${page}`);
  //   setCurrentPage(page);
  //   setIsLoading(true);
  //   const newUsers = await getRandomData();
  //   if (page > 1) {
  //     setUsers((prev) => [...prev, ...newUsers]);
  //   } else {
  //     setUsers(newUsers);
  //   }
  //   setIsLoading(false);
  // }, []);

  const loadMore = () => {
    if (hasNextPage) {
      // load more users
      console.log(`Call API with page = ${pageMeta.current_page}`);
      fetchUsers({ page: pageMeta.current_page + 1, user_id });
    }
  };

  // useEffect(() => {
  //   const params = { page: 1 };
  //   if (open) {
  //     fetchUsers(params);
  //   }

  //   return () => {
  //     // clear users
  //     setUsers([]);
  //     setCurrentPage(1);
  //     setIsLoading(false);
  //   };
  // }, [fetchUsers, open]);

  useEffect(() => {
    const params = { page: 1, user_id };
    fetchUsers(params);
    return () => {
      clearUsers();
    };
  }, [user_id]);

  const Header = ({ title }: { title: string }) => {
    return (
      <div className='flex items-center gap-4 mb-5'>
        <div
          className='w-8 h-8 flex bg-neutral-500 cursor-pointer rounded-full transition-colors'
          onClick={handleCloseModal}
        >
          <IoMdArrowBack className='m-auto text-gray-300 text-xl' />
        </div>
        <span className='text-xl font-medium text-gray-700'>{title}</span>
      </div>
    );
  };

  const Item = (props: { index: number; style: CSSProperties }) => {
    const { index, style } = props;
    const user = users?.[index];
    return user ? (
      <div style={style}>
        <UserFollowCard user={user} handleFollow={user.is_followed ? unfollowUser : followUser} />
      </div>
    ) : null;
  };

  if (!users) {
    return null;
  }

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
        {meta.pending && !users?.length ? (
          <div className='w-full flex justify-center items-center h-96'>
            <LSLoader />
          </div>
        ) : (
          <div>
            <InfiniteLoader
              isItemLoaded={(index) => index < users.length}
              itemCount={itemCount}
              loadMoreItems={loadMore}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  ref={ref}
                  itemCount={users.length}
                  width='100%'
                  itemSize={68}
                  onItemsRendered={onItemsRendered}
                  itemData={[users]}
                  height={400}
                  className={classes.list}
                >
                  {Item}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          </div>
        )}
      </LSModal>
    </div>
  );
};

export default FollowUser;
