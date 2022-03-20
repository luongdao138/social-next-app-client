import React from 'react';
import { MdSearch } from 'react-icons/md';

const Search = () => {
  return (
    <div>
      <form>
        <input type='text' />
      </form>
      <div>
        <MdSearch />
        <span>Enter to search</span>
      </div>
    </div>
  );
};

export default Search;
