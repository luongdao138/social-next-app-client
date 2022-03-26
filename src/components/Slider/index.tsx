import React from 'react';
import classes from './Slider.module.css';

interface Props {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const LSSlider: React.FC<Props> = ({ value, onChange, min = 1, max = 10, step = 0.1 }) => {
  return (
    <div
      className='bg-white rounded-lg px-5 py-2 w-full mt-4'
      style={{ maxWidth: '500px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
    >
      <div className='relative'>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            console.log(Number(e.target.value));
            onChange(Number(e.target.value));
          }}
          className={`w-full appearance-none h-2 bg-gray-200 rounded outline-none border-none ${classes.range}`}
        />
      </div>
    </div>
  );
};

export default LSSlider;
