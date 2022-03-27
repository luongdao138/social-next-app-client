import Avatar from 'components/Avatar';
import { MEDIA_QUERY } from 'constants/mediaQuery.constant';
import { useState } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import CoverImageAction from './CoverImageAction';

interface Props {
  avatar: string;
  is_own?: boolean;
  openCropper: () => void;
  removeAvatar: () => void;
}

const ProfileAvatar: React.FC<Props> = ({ avatar, is_own, openCropper, removeAvatar }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const matchSm = useMediaQuery(MEDIA_QUERY.xs);

  const size = matchSm ? 180 : 120;

  const handleToggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleOpenMenu = () => {
    if (!open) {
      setOpen(true);
    }
  };

  if (!is_own) {
    return (
      <div
        className={`absolute  ${
          matchSm ? '-bottom-16 left-8' : '-bottom-12 left-1/2 -translate-x-1/2'
        }`}
        style={{ maxWidth: size }}
      >
        <Avatar
          size={size}
          src={avatar}
          className={`border-4 border-solid border-teal-400 transition-all ${
            isFocus ? 'scale-95' : ''
          } `}
          isLink={false}
          style={{ minWidth: size }}
        />
      </div>
    );
  }

  return (
    <div
      className={`absolute  ${
        matchSm ? '-bottom-16 left-8' : '-bottom-12 left-1/2 -translate-x-1/2'
      }`}
      style={{ maxWidth: size }}
    >
      <Avatar
        size={size}
        src={avatar}
        className={`cursor-pointer border-4 border-solid border-teal-400 transition-all ${
          isFocus ? 'scale-95' : ''
        } `}
        isLink={false}
        style={{ minWidth: size }}
        clickHandler={handleOpenMenu}
        onMouseDown={() => setIsFocus(true)}
        onMouseUp={() => setIsFocus(false)}
        onMouseLeave={() => setIsFocus(false)}
      />
      <div
        className={`w-10 h-10 flex bg-neutral-600 cursor-pointer rounded-full absolute bottom-0 right-0 ${
          matchSm ? '-translate-x-2 -translate-y-2' : ''
        } hover:bg-neutral-500 transition-colors`}
        onClick={openCropper}
      >
        <MdCameraAlt className='m-auto text-white text-2xl' />
      </div>
      {open ? (
        <CoverImageAction
          removeAvatar={removeAvatar}
          openCropper={openCropper}
          toggle={handleToggleMenu}
        />
      ) : null}
    </div>
  );
};

export default ProfileAvatar;
