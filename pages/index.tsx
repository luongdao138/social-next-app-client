import PageWithLayout from 'constants/page';
import HomeContainer from 'containers/Home';
import MainLayout from 'layouts/MainLayout';

const HomePage: PageWithLayout = () => {
  return (
    <MainLayout loginRequired>
      <HomeContainer />
    </MainLayout>
  );
};

export default HomePage;
