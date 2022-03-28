import AutoResizeTextarea from 'components/AutoResizeTextarea';
import React, { useState } from 'react';

interface Props {}

const PostText: React.FC<Props> = ({}) => {
  const [status, setStatus] = useState<string>('');

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
      />
    </div>
  );
};

export default PostText;
