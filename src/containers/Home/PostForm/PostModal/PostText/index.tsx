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

  return (
    <div>
      <AutoResizeTextarea
        placeholder='Luongdao, what are you thinking?'
        value={status || ''}
        onChange={handleChange}
        minRows={2}
      />
    </div>
  );
};

export default PostText;
