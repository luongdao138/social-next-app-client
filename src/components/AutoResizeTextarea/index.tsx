import React, { useEffect, useRef, useState } from 'react';
import classes from './AutoResizeTextarea.module.css';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  placeholder?: string;
  value: string;
  minRows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutoResizeTextarea: React.FC<Props> = ({ placeholder, value, onChange, minRows = 3 }) => {
  return (
    <div>
      <TextareaAutosize
        minRows={minRows}
        value={value}
        placeholder={placeholder}
        className={`w-full h-24 resize-none outline-none text-3xl ${classes.textarea}`}
        onChange={onChange}
      />
    </div>
  );
};

export default AutoResizeTextarea;
