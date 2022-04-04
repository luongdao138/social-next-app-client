import AutoResizeTextarea from 'components/AutoResizeTextarea';
import React from 'react';
import { usePostFormContext } from '../../../PostFormContext';
interface Props {
  open?: boolean;
}

const PostText: React.FC<Props> = ({ open }) => {
  const { status, updateStatus } = usePostFormContext();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateStatus((e.target as HTMLTextAreaElement).value);
  };
  const { postTextRef, userAuth } = usePostFormContext();
  return (
    <div>
      <AutoResizeTextarea
        placeholder={`${userAuth?.username}, what are you thinking?`}
        value={status || ''}
        onChange={handleChange}
        minRows={2}
        postTextRef={postTextRef}
      />
    </div>
  );
};

export default PostText;
