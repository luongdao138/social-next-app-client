import React, { useRef, useState } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';

interface Props {
  user_id: string;
  onSearch: (keyword: string) => void;
}

const Search: React.FC<Props> = ({ onSearch, user_id }) => {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleRemoveSearch = () => {
    setValue('');
    inputRef.current?.focus();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    onSearch(value);
  };

  return (
    <div className='relative'>
      <form onSubmit={handleSearch}>
        <input
          type='text'
          className='w-full outline-none py-1 px-2 rounded border border-solid '
          value={value}
          onChange={handleChange}
          ref={inputRef}
        />
      </form>
      {!value && (
        <div className='absolute flex items-center gap-1 opacity-30 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none'>
          <MdSearch />
          <span className='text-xs'>Enter to search</span>
        </div>
      )}

      {!!value ? (
        <span
          className='absolute top-2/4 -translate-y-2/4 right-2 cursor-pointer text-gray-700'
          onClick={handleRemoveSearch}
        >
          <MdClose />
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
