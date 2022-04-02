import React, { useCallback, useState } from 'react';
import PostInput from './PostInput';
import PostModal from './PostModal';

const PostFormContainer = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <PostInput openModal={() => setOpen(true)} />
      {open ? <PostModal open={open} onClose={handleCloseModal} /> : null}
    </div>
  );
};

export default PostFormContainer;
