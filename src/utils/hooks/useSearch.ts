import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectors, actions } from 'store/search';

const useSearch = () => {
  const dispatch = useAppDispatch();
  const searchKeyword = useAppSelector(selectors.getSearchKeyword);

  const onSearch = (keyword: string) => dispatch(actions.setSearchKeyword(keyword));

  return {
    searchKeyword,
    onSearch,
  };
};

export default useSearch;
