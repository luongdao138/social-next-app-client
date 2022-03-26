import { LSRoutes } from 'constants/route.constant';
import Link from 'next/link';
import React, { CSSProperties } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  [key: string]: any;
  src: string;
  alt?: string;
  size: number;
  isLink?: boolean;
  href?: string;
}

const Avatar: React.FC<Props> = ({
  size,
  isLink = true,
  href = LSRoutes.HOME,
  className = '',
  clickHandler,
  ...rest
}) => {
  const image = (
    <LazyLoadImage
      width={size}
      className={`rounded-full aspect-square object-cover overflow-hidden ${className}`}
      onClick={() => clickHandler && clickHandler()}
      {...rest}
    />
  );

  if (isLink) {
    return (
      <Link href={href}>
        <a>{image}</a>
      </Link>
    );
  }

  return image;
};

export default Avatar;
