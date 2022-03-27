import faker from '@faker-js/faker';
import LSLoader from 'components/LsLoader';
import UserFollowCard from 'components/UserFollowCard';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserResponse } from 'services/search.service';
import useSearch from 'utils/hooks/useSearch';
import { v4 as uuidv4 } from 'uuid';
import useSearchUser from './useSearchUser';

// async function getRandomData(): Promise<UserResponse[]> {
//   return new Promise<UserResponse[]>((resolve) => {
//     setTimeout(() => {
//       resolve(
//         [...new Array<UserResponse>(10)].map(() => ({
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

const SearchContainer = () => {
  const router = useRouter();
  const { searchKeyword, clearSearch } = useSearch();
  const { fetchUsers, pageMeta, searchMeta, users, resetMeta, followUser, unfollowUser } =
    useSearchUser();
  // const [users, setUsers] = useState<UserResponse[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalPage, setTotalPage] = useState<number>(10);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const hasNextPage = currentPage < totalPage;
  // const itemCount = users.length;
  const hasNextPage = pageMeta && pageMeta?.current_page < pageMeta?.total_pages;
  const itemCount = users.length;

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

  // const loadMore = () => {
  //   if (hasNextPage) {
  //     // load more users
  //     console.log(`Call API with page = ${currentPage}`);
  //     fetchUsers({ page: currentPage + 1 });
  //   }
  // };
  const loadMore = () => {
    if (hasNextPage) {
      console.log(`Call API with page = ${pageMeta.current_page}`);
      fetchUsers({ keyword: searchKeyword, page: pageMeta.current_page + 1 });
    }
  };

  // useEffect(() => {
  //   const params = { page: 1 };
  //   fetchUsers(params);
  //   return () => {
  //     // clear users
  //     setUsers([]);
  //     setCurrentPage(1);
  //     setIsLoading(false);
  //   };
  // }, [fetchUsers]);

  useEffect(() => {
    const params = { page: 1, keyword: searchKeyword };
    fetchUsers(params);

    return () => {
      clearSearch();
      resetMeta();
    };
  }, [searchKeyword, fetchUsers, clearSearch, resetMeta]);

  const Header = ({ title }: { title: string }) => {
    return (
      <div className='p-4 border border-solid border-gray-200'>
        <div className='flex items-center gap-4'>
          <div
            className='w-8 h-8 flex bg-neutral-500 cursor-pointer rounded-full transition-colors'
            onClick={() => router.back()}
            style={{ minWidth: 32 }}
          >
            <IoMdArrowBack className='m-auto text-gray-300 text-xl' />
          </div>
          <span className='text-sm sm:text-xl font-medium text-gray-700'>{title}</span>
        </div>
      </div>
    );
  };

  return (
    <div className='max-w-6xl w-full px-5 mx-auto'>
      <div className='max-w-4xl w-full mx-auto'>
        <Header title={`Search results for "${searchKeyword}"`} />
        <div className='p-4'>
          {pageMeta && (
            <p className='font-medium text-sm text-gray-500 mb-2'>
              {pageMeta.total_count} search results
            </p>
          )}

          {/* Testing */}
          {/* <div className='-mx-2'>
            {[...new Array(10)].map((index, _) => {
              return (
                <UserFollowCard
                  user={{
                    _id: '1',
                    fullname: 'Dao Van Luong',
                    username: 'luongdao',
                    avatar:
                      'https://res.cloudinary.com/luongdao/image/upload/v1648309606/l-network/xcwizm0tjxjrngvrxs0n.jpg',
                    is_followed: true,
                  }}
                  handleFollow={() => {}}
                  key={index}
                />
              );
            })}
          </div> */}
          <InfiniteScroll
            dataLength={itemCount}
            hasMore={!!hasNextPage}
            loader={null}
            next={loadMore}
            scrollThreshold={0.9}
          >
            {users.map((user) => {
              return (
                <UserFollowCard
                  user={user}
                  handleFollow={user.is_followed ? unfollowUser : followUser}
                  key={user._id}
                />
              );
            })}
          </InfiniteScroll>
          {searchMeta.pending && (
            <div className='w-full flex justify-center mt-8 mb-4'>
              <LSLoader />
            </div>
          )}
          {/* Testing */}
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
