import PageWithLayout from 'constants/page';
import SearchContainer from 'containers/Search';
import MainLayout from 'layouts/MainLayout';
import React from 'react';

const SearchPage: PageWithLayout = () => {
  return (
    <MainLayout loginRequired>
      <SearchContainer />
    </MainLayout>
  );
};

export default SearchPage;
