import Avatar from 'components/Avatar';
import { useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import CoverImageAction from './CoverImageAction';

interface Props {
  avatar: string;
}

const ProfileCover: React.FC<Props> = ({ avatar }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleOpenMenu = () => {
    if (!open) {
      setOpen(true);
    }
  };

  return (
    <div className='relative'>
      <Avatar
        size={180}
        src={avatar}
        className={`cursor-pointer hover:opacity-90 transition-all ${isFocus ? 'scale-95' : ''} `}
        isLink={false}
        style={{ minWidth: 180 }}
        clickHandler={handleOpenMenu}
        onMouseDown={(e: MouseEvent) => setIsFocus(true)}
        onMouseUp={(e: MouseEvent) => setIsFocus(false)}
        onMouseLeave={(e: MouseEvent) => setIsFocus(false)}
      />
      <div className='w-10 h-10 flex bg-neutral-600 cursor-pointer rounded-full absolute bottom-0 right-0 -translate-x-2 -translate-y-2 hover:bg-neutral-500 transition-colors'>
        <MdCameraAlt className='m-auto text-white text-2xl' />
      </div>
      {open ? <CoverImageAction toggle={handleToggleMenu} /> : null}
    </div>
  );
};

export default ProfileCover;
