import React from 'react';
import { FieldHookConfig, useField } from 'formik';

type LSTextAreaProps = {
  label?: string;
  smallText?: string;
};

const LSTextArea: React.FC<LSTextAreaProps & FieldHookConfig<string>> = (props) => {
  const [field, meta, helpers] = useField(props.name);

  const isError = meta.error && meta.touched;
  const errorClass = isError
    ? 'border-red-600'
    : 'border-neutral-300 focus:shadow-sm focus:shadow-sky-400 focus:border-sky-400';

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={props.id || props.name} className={`${isError ? 'text-red-600' : ''}`}>
        {props.label || ''}
      </label>
      <textarea
        {...field}
        placeholder={props.placeholder}
        id={props.id || props.name}
        className={`outline-none border h-28 border-solid ${errorClass}  py-2 px-3 w-full rounded`}
      />
      <div className='flex items-center justify-between gap-2'>
        {isError ? <p className='text-sm font-medium text-red-600'>{meta.error}</p> : <p></p>}
        {props.smallText && (
          <p className='text-right text-xs font-medium text-red-500'>{props.smallText}</p>
        )}
      </div>
    </div>
  );
};

export default LSTextArea;
