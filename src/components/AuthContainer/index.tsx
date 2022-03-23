const AuthContainer: React.FC = ({ children }) => {
  return (
    <div className='w-full min-h-screen bg-neutral-100 flex items-center justify-center'>
      <div className='w-full bg-white max-w-xl mx-auto  p-5 md:shadow-xl md:border md:border-gray-200 rounded-lg flex flex-col items-center'>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
