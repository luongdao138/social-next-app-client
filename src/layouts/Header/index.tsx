import React from 'react';
import Nav from './Nav';
import Search from './Search';

const Header = () => {
  return (
    <div className='w-full'>
      <div
        className='flex justify-between p-5 shadow-md border border-solid border-neutral-300 rounded-sm items-center h-20 fixed max-w-6xl w-full bg-white z-20  top-0'
        style={{ margin: 'auto' }}
      >
        <div>
          <h1 className='text-3xl uppercase font-semibold'>L-Network</h1>
        </div>
        <Search />
        <Nav />
      </div>
    </div>
  );
};

export default Header;
