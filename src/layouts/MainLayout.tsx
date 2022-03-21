import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-full mx-auto max-w-6xl'>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
