import PageWithLayout from 'constants/page';
import ProfileContainer from 'containers/Profile';
import MainLayout from 'layouts/MainLayout';
import React from 'react';

const ProfilePage: PageWithLayout = () => {
  return (
    <MainLayout loginRequired>
      <ProfileContainer />
    </MainLayout>
  );
};

export default ProfilePage;
