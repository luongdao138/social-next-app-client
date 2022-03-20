import { LSRoutes } from 'constants/route.constant';
import Link from 'next/link';
import React from 'react';
import { useRef } from 'react';
import useClickOutside from 'utils/hooks/useClickOutside';

interface MenuProps {
  toggle: () => void;
}

const Menu: React.FC<MenuProps> = ({ toggle }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: menuRef,
    cb: toggle,
  });

  const itemClassName =
    'block px-4 py-1 transition-all duration-200 hover:bg-gray-100 cursor-pointer';

  return (
    <div
      className='absolute right-0 top-full shadow-md border border-solid border-neutral-300 rounded bg-white py-2 z-10'
      style={{ minWidth: '150px' }}
      ref={menuRef}
    >
      <Link href={LSRoutes.PROFILE_DETAIL.replace(/:id/gi, '1')}>
        <a className={itemClassName}>Profile</a>
      </Link>
      <span className={itemClassName}>Dark mode</span>
      <span className='w-full bg-slate-200 my-2 block ' style={{ height: '1px' }}></span>
      <span className={itemClassName}>Logout</span>
    </div>
  );
};

export default Menu;
