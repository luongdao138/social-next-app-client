import React from 'react';
import PostFormContainer from './PostForm';
import PostListContainer from './PostList';

const HomeContainer = () => {
  return (
    <div className='max-w-6xl w-full mx-auto p-5'>
      <div className='grid gap-5 grid-cols-3'>
        <div className='col-span-2'>
          <PostFormContainer />
          <PostListContainer />
        </div>
        <div className=''>Right</div>
      </div>
    </div>
  );
};

export default HomeContainer;
