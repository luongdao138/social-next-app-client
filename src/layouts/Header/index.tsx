import React from 'react';
import Nav from './Nav';
import Search from './Search';

const Header = () => {
  return (
    <div className='flex justify-between p-4'>
      <div>
        <h1>L-Network</h1>
      </div>
      <Search />
      <Nav />
    </div>
  );
};

export default Header;
