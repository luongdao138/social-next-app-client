import React from 'react';
import Nav from './Nav';
import Search from './Search';

const Header = () => {
  return (
    <div className='flex justify-between p-5 shadow-md border border-solid border-neutral-300 rounded-sm items-center h-20'>
      <div>
        <h1 className='text-3xl uppercase font-semibold'>L-Network</h1>
      </div>
      <Search />
      <Nav />
    </div>
  );
};

export default Header;
