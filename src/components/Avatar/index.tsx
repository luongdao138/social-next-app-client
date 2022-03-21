import { LSRoutes } from 'constants/route.constant';
import Link from 'next/link';
import React, { CSSProperties } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  src: string;
  alt?: string;
  size: number;
  isLink?: boolean;
  href?: string;
  style?: CSSProperties;
}

const Avatar: React.FC<Props> = ({
  style,
  src,
  alt = '',
  size,
  isLink = true,
  href = LSRoutes.HOME,
}) => {
  const image = (
    <LazyLoadImage
      alt={alt}
      src={src}
      width={size}
      className='rounded-full aspect-square object-cover'
      style={style}
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
