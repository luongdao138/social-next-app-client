import { LSRoutes } from 'constants/route.constant';
import Link from 'next/link';
import React, { useState } from 'react';
import { getUserAuth } from 'store/auth/selectors';
import { useAppSelector } from 'store/hooks';
import useElementSize from 'utils/hooks/useElementSize';
import Nav from './Nav';
import Search from './Search';
import _ from 'lodash';

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [headerRef, { width, height }] = useElementSize();
  const userAuth = useAppSelector(getUserAuth);
  const user_id = _.get(userAuth, '_id', '');

  const handleToggle = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleSearch = (keyword: string) => {
    console.log(keyword);
  };

  return (
    <>
      <div
        className='flex-column sm:flex justify-between px-5 py-3 shadow-md border border-solid border-neutral-300 rounded-sm items-center fixed max-w-6xl w-full bg-white z-20 top-0'
        ref={headerRef}
      >
        <div className='hidden md:block'>
          <h1 className='text-3xl uppercase font-semibold'>
            <Link href={LSRoutes.HOME}>L-Network</Link>
          </h1>
        </div>
        <Search user_id={user_id} onSearch={handleSearch} />
        <Nav open={openMenu} toggle={handleToggle} />
      </div>
      <div style={{ marginBottom: height }}></div>
    </>
  );
};

export default Header;
