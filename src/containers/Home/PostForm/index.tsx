import React, { useState } from 'react';
import PostInput from './PostInput';
import PostModal from './PostModal';

const PostFormContainer = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <PostInput openModal={() => setOpen(true)} />
      <PostModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default PostFormContainer;
