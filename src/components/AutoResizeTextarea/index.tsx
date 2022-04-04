import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classes from './AutoResizeTextarea.module.css';

interface Props {
  placeholder?: string;
  value: string;
  minRows?: number;
  open?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  postTextRef?: React.RefObject<HTMLTextAreaElement>;
}

const AutoResizeTextarea: React.FC<Props> = ({
  placeholder,
  value,
  onChange,
  minRows = 3,
  postTextRef,
}) => {
  return (
    <div>
      <TextareaAutosize
        minRows={minRows}
        value={value}
        placeholder={placeholder}
        className={`w-full h-24 resize-none outline-none text-2xl ${classes.textarea}`}
        onChange={onChange}
        autoFocus
        ref={postTextRef}
      />
    </div>
  );
};

export default AutoResizeTextarea;
