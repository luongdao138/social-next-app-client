import React, { useState } from 'react';
import PostContextProvider from './PostFormContext';
import PostInput from './PostInput';
import PostModal from './PostModal';

const PostFormContainer = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <PostContextProvider>
      <div>
        <PostInput openModal={() => setOpen(true)} />
        <PostModal open={open} onClose={() => setOpen(false)} />
      </div>
    </PostContextProvider>
  );
};

export default PostFormContainer;
