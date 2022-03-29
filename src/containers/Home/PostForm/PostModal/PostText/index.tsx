import AutoResizeTextarea from 'components/AutoResizeTextarea';
import React, { useState } from 'react';
import { usePostFormContext } from '../../PostFormContext';

interface Props {
  open?: boolean;
}

const PostText: React.FC<Props> = ({ open }) => {
  const { status, setStatus, postTextRef } = usePostFormContext();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStatus((e.target as HTMLTextAreaElement).value);
  };

  return (
    <div>
      <AutoResizeTextarea
        placeholder='Luongdao, what are you thinking?'
        value={status}
        onChange={handleChange}
        minRows={2}
        open={open}
        postTextRef={postTextRef}
      />
    </div>
  );
};

export default PostText;
