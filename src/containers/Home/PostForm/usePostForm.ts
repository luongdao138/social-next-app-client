import { useEffect } from 'react';
import { CreatePostParams } from 'services/timeline.service';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearMetaData } from 'store/metadata/actions';
import { createMetaSelector } from 'store/metadata/selectors';
import { actions } from 'store/timeline';

const getCreatePostMeta = createMetaSelector(actions.createPost);

const usePostForm = () => {
  const createPostMeta = useAppSelector(getCreatePostMeta);
  const dispatch = useAppDispatch();

  const createPost = (params: CreatePostParams) => {
    dispatch(actions.createPost(params));
  };

  useEffect(() => {
    return () => {
      dispatch(clearMetaData(actions.createPost.typePrefix));
    };
  }, [dispatch]);

  return { createPostMeta, createPost };
};

export default usePostForm;
