import React from 'react';
import Link from 'next/link';
import { MdHome, MdNearMe, MdExplore, MdFavorite } from 'react-icons/md';
import { BsFillCaretDownFill } from 'react-icons/bs';

import { LSRoutes } from 'constants/route.constant';
import Menu from './Menu';
import Avatar from 'components/Avatar';

interface NavIconProps {
  icon: React.ReactNode;
  url: string;
  isActive?: boolean;
}

const NavIcon: React.FC<NavIconProps> = ({ icon, url, isActive = false }) => {
  return (
    <Link href={url}>
      <a className='text-3xl'>{icon}</a>
    </Link>
  );
};

const Nav = () => {
  return (
    <div className='flex items-center gap-6'>
      <NavIcon icon={<MdHome />} url={LSRoutes.HOME} isActive />
      <NavIcon icon={<MdNearMe />} url={LSRoutes.MESSAGE} />
      <NavIcon icon={<MdExplore />} url={LSRoutes.DISCOVER} />
      <div>
        <MdFavorite className='text-3xl' />
      </div>
      <div className='relative'>
        <div className='flex items-center gap-1 cursor-pointer py-3'>
          <Avatar
            size={30}
            src='https://images.unsplash.com/photo-1647627573078-d8f5b48ab85a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
            href={LSRoutes.PROFILE_DETAIL.replace(/:id/gi, '1')}
          />
          <BsFillCaretDownFill />
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default Nav;
