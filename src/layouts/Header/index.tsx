import React, { useState } from 'react';
import useElementSize from 'utils/hooks/useElementSize';
import Nav from './Nav';
import Search from './Search';

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [headerRef, { width, height }] = useElementSize();

  console.log({ width, height });

  const handleToggle = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <>
      <div
        className='flex-column sm:flex justify-between px-5 py-3 shadow-md border border-solid border-neutral-300 rounded-sm items-center fixed max-w-6xl w-full bg-white z-20 top-0'
        ref={headerRef}
      >
        <div className='hidden md:block'>
          <h1 className='text-3xl uppercase font-semibold'>L-Network</h1>
        </div>
        <Search />
        <Nav open={openMenu} toggle={handleToggle} />
      </div>
      <div style={{ marginBottom: height }}></div>
    </>
  );
};

export default Header;
