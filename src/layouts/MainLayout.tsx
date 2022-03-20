import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-full max-w-6xl mx-auto'>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
