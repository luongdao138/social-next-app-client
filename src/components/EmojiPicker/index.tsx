import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { BaseEmoji, Picker } from 'emoji-mart';
import useClickOutside from 'utils/hooks/useClickOutside';
import useEventListener from 'utils/hooks/useEventListener';

interface Props {
  handleCloseEmoji: () => void;
  onSelect: (e: BaseEmoji) => void;
}

interface Position {
  width: number;
  right: number;
}

const EmojiPicker: React.FC<Props> = ({ handleCloseEmoji, onSelect }) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ right: 0, width: 0 });

  const updatePosition = useCallback(() => {
    if (pickerRef.current) {
      const width = pickerRef.current.offsetWidth;
      const right = innerWidth - pickerRef.current.getBoundingClientRect().right;

      setPosition({ width, right });
    }
  }, []);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  useClickOutside({ cb: handleCloseEmoji, ref: pickerRef });
  useEventListener('resize', updatePosition);

  return (
    <div
      ref={pickerRef}
      className='absolute right-0 top-0'
      style={{
        transform: position.right >= 240 ? 'translate(50%, -102%)' : 'translateY(-102%)',
        zIndex: 100,
      }}
    >
      <Picker autoFocus onSelect={onSelect} />
    </div>
  );
};

export default EmojiPicker;
