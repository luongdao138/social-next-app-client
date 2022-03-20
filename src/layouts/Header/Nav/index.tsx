import React from 'react';
import Link from 'next/link';
import { MdHome, MdNearMe, MdExplore, MdFavorite } from 'react-icons/md';
import { BsFillCaretDownFill } from 'react-icons/bs';

import { LSRoutes } from 'constants/route.constant';
import Menu from './Menu';
import Avatar from 'components/Avatar';
import { useRouter } from 'next/router';

interface NavIconProps {
  icon: React.ReactNode;
  url: string;
  isActive?: boolean;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, url, isActive = false }) => {
  return (
    <Link href={url}>
      <a
        className={`transition-all duration-200 text-3xl ${
          isActive ? '' : 'opacity-30 hover:opacity-50'
        }`}
      >
        {icon}
      </a>
    </Link>
  );
};

interface NavProps {
  open: boolean;
  toggle: () => void;
}

const Nav: React.FC<NavProps> = ({ toggle, open }) => {
  const router = useRouter();

  return (
    <div className='flex items-center gap-6'>
      <NavIcon icon={<MdHome />} url={LSRoutes.HOME} isActive={router.pathname === LSRoutes.HOME} />
      <NavIcon
        icon={<MdNearMe />}
        url={LSRoutes.MESSAGE}
        isActive={router.pathname === LSRoutes.MESSAGE}
      />
      <NavIcon
        icon={<MdExplore />}
        url={LSRoutes.DISCOVER}
        isActive={router.pathname === LSRoutes.DISCOVER}
      />
      <div>
        <MdFavorite className='cursor-pointer transition-all duration-200 text-3xl opacity-50 hover:opacity-70' />
      </div>
      <div className='relative'>
        <div
          className='flex items-center gap-1 cursor-pointer py-3'
          onClick={() => !open && toggle()}
        >
          <Avatar
            size={40}
            src='https://images.unsplash.com/photo-1647627573078-d8f5b48ab85a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
            isLink={false}
          />
          <BsFillCaretDownFill
            className={`transition-all duration-200 ${open ? 'opacity-70' : 'opacity-50'}`}
          />
        </div>
        {open ? <Menu toggle={toggle} /> : null}
      </div>
    </div>
  );
};

export default Nav;
