import FullScreenLoader from 'components/FullScreenLoader';
import React, { useCallback, useEffect, useState } from 'react';
import useToast from 'utils/hooks/useToast';
import { TABS, usePostFormContext } from '../PostFormContext';
import PostInput from './PostInput';
import PostModal from './PostModal';
import usePostForm from './usePostForm';

const PostFormContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { changeTab, resetPostForm } = usePostFormContext();
  const { createPostMeta } = usePostForm();
  const { addToast } = useToast();

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      changeTab(TABS.MAIN);
    }
  }, [open, changeTab]);

  useEffect(() => {
    if (createPostMeta.loaded) {
      resetPostForm();
      addToast({
        message: 'Create post success!',
        severity: 'success',
      });
      setOpen(false);
    } else if (createPostMeta.error && createPostMeta.error_message) {
      addToast({
        message: createPostMeta.error_message,
        severity: 'error',
      });
    }
  }, [createPostMeta, resetPostForm, addToast]);

  return (
    <div>
      <FullScreenLoader open={createPostMeta.pending} />
      <PostInput openModal={() => setOpen(true)} />
      {open ? <PostModal open={open} onClose={handleCloseModal} /> : null}
    </div>
  );
};

export default PostFormContainer;
