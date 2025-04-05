import React, { useEffect, useState } from 'react';
import { Avatar, SxProps, Theme } from '@mui/material';
import { BucketType } from '@/safira-app/services/aws/s3';
import { fetcher } from '@/safira-app/utils/fetcher';
import NoAvatar from '@/safira-app/assets/profileNotPhoto.svg';

export interface RenderAvatarProps {
  src?: string;
  sx?: SxProps<Theme> | undefined;
  alt?: string;
  variant?: 'circular' | 'square' | 'rounded' | undefined;
  component?: React.ElementType<any>;
  href?: string;
  bucket?: BucketType;
}

const RenderAvatar: React.FC<React.PropsWithChildren<RenderAvatarProps>> = ({
  children,
  src,
  alt,
  href,
  sx,
  variant,
  component,
  bucket = 'incicle',
  ...rest
}) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!src) return;

    fetcher(src, bucket).then(data => setUrl(data!));
  }, [fetcher, src]);

  return (
    <Avatar
      variant={variant}
      alt={alt}
      src={url || NoAvatar}
      sx={sx}
      component={component || 'div'}
      href={href}
      {...rest}
    >
      {children}
    </Avatar>
  );
};

export default RenderAvatar;
