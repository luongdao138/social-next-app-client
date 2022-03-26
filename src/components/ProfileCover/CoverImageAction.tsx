import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import { IoMdImages } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import useClickOutside from 'utils/hooks/useClickOutside';
import useEventListener from 'utils/hooks/useEventListener';

interface BoundingRectClient {
  top: number;
  left: number;
  bottom: number;
  right: number;
}
interface ItemProps {
  icon: React.ReactNode;
  text: string;
  clickHandler: () => void;
}

const CoverActionItem: React.FC<ItemProps> = ({ icon, text, clickHandler }) => {
  return (
    <li
      onClick={clickHandler}
      className='flex gap-2 items-center p-2 transition-all duration-300 rounded-md cursor-pointer hover:bg-neutral-100'
    >
      {icon}
      <span className='font-medium text-neutral-800'>{text}</span>
    </li>
  );
};

interface Props {
  openCropper: () => void;
  toggle: () => void;
  removeAvatar: () => void;
}

const CoverImageAction: React.FC<Props> = ({ toggle, openCropper, removeAvatar }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [offset, setOffset] = useState<BoundingRectClient>({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  });

  const handleUpdateOffset = useCallback(() => {
    if (ref.current) {
      setOffset(ref.current.getBoundingClientRect());
    }
  }, []);

  const handleOpenCropper = () => {
    openCropper();
    toggle();
  };

  const handleRemoveAvatar = () => {
    removeAvatar();
    toggle();
  };

  useEffect(() => {
    handleUpdateOffset();
  }, [handleUpdateOffset]);

  useClickOutside({ ref, cb: toggle });

  useEventListener('resize', handleUpdateOffset);

  return (
    <ul
      ref={ref}
      className={`absolute w-60 p-2 bg-white rounded-md ${
        offset.left <= 30 ? 'left-0' : 'left-1/2 -translate-x-1/2'
      } z-10 shadow-md border border-solid border-neutral-200`}
      style={{ bottom: `-${offset.bottom - offset.top + 10}px` }}
    >
      <CoverActionItem
        clickHandler={() => {}}
        icon={<BiUserCircle className='text-2xl' />}
        text='View your avatar'
      />
      <CoverActionItem
        clickHandler={handleOpenCropper}
        icon={<IoMdImages className='text-2xl' />}
        text='Update your avatar'
      />
      <CoverActionItem
        clickHandler={handleRemoveAvatar}
        icon={<MdDelete className='text-2xl' />}
        text='Remove your avatar'
      />
    </ul>
  );
};

export default CoverImageAction;
