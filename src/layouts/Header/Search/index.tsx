import React from 'react';
import { MdSearch } from 'react-icons/md';

const Search = () => {
  return (
    <div className='relative'>
      <form>
        <input type='text' className='w-full outline-none py-1 px-2 rounded border border-solid ' />
      </form>
      <div className='absolute flex items-center gap-1 opacity-30 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none'>
        <MdSearch />
        <span className='text-xs'>Enter to search</span>
      </div>
    </div>
  );
};

export default Search;
