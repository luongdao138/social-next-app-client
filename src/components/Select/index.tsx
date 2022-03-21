import React from 'react';
import { FieldHookConfig, useField } from 'formik';

type Option = {
  label: string;
  value: string | number;
};

type LSSelectProps = {
  label?: string;
  options: Option[];
};

const LSSelect: React.FC<LSSelectProps & FieldHookConfig<string>> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const isError = meta.error && meta.touched;

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={props.id || props.name} className={`${isError ? 'text-red-600' : ''}`}>
        {props.label || ''}
      </label>
      <div>
        <select
          {...field}
          placeholder={props.placeholder}
          className={`outline-none border border-solid ${
            isError
              ? 'border-red-600'
              : 'border-neutral-300 focus:shadow-sm focus:shadow-sky-400 focus:border-sky-400'
          } py-2 px-3 w-full rounded`}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {isError ? <div className='text-sm font-medium text-red-600'>{meta.error}</div> : null}
    </div>
  );
};

export default LSSelect;
