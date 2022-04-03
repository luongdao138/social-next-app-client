import React, { useCallback, useEffect, useState } from 'react';
import { TABS, usePostFormContext } from '../PostFormContext';
import PostInput from './PostInput';
import PostModal from './PostModal';

const PostFormContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { changeTab } = usePostFormContext();

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      changeTab(TABS.MAIN);
    }
  }, [open, changeTab]);

  return (
    <div>
      <PostInput openModal={() => setOpen(true)} />
      {open ? <PostModal open={open} onClose={handleCloseModal} /> : null}
    </div>
  );
};

export default PostFormContainer;
