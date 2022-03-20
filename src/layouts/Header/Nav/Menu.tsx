import { LSRoutes } from 'constants/route.constant';
import Link from 'next/link';
import React from 'react';

const Menu = () => {
  return (
    <div>
      <Link href={LSRoutes.PROFILE_DETAIL.replace(/:id/gi, '1')}>
        <a>Profile</a>
      </Link>
      <span>Dark mode</span>
      <span></span>
      <span>Logout</span>
    </div>
  );
};

export default Menu;
