import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='w-full mx-auto max-w-6xl'>
      <Header />
      <div className='mt-20'>{children}</div>
    </div>
  );
};

export default MainLayout;
