import PageWithLayout from 'constants/page';
import MainLayout from 'layouts/MainLayout';
import React from 'react';

const SearchPage: PageWithLayout = () => {
  return (
    <MainLayout loginRequired>
      <div>SearchPage</div>
    </MainLayout>
  );
};

export default SearchPage;
