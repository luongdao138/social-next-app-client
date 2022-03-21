import React from 'react';
import { FieldHookConfig, useField } from 'formik';

type LSInputProps = {
  icon?: React.ReactNode;
  label?: string;
  position?: 'start' | 'end';
};

const LSInput: React.FC<LSInputProps & FieldHookConfig<string>> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const { icon, position } = props;

  const isError = meta.error && meta.touched;

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={props.id || props.name} className={`${isError ? 'text-red-600' : ''}`}>
        {props.label || ''}
      </label>
      <div>
        <input
          {...field}
          placeholder={props.placeholder}
          className={`outline-none border border-solid ${
            isError
              ? 'border-red-600'
              : 'border-neutral-300 focus:shadow-sm focus:shadow-sky-400 focus:border-sky-400'
          } py-2 px-3 w-full rounded`}
        />
      </div>
      {isError ? <div className='text-sm font-medium text-red-600'>{meta.error}</div> : null}
    </div>
  );
};

export default LSInput;
