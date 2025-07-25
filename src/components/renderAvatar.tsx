import React, { useEffect, useState } from 'react';
import { Avatar, SxProps, Theme } from '@mui/material';
import { BucketType } from '@/services/aws/s3';
import { fetcher } from '@/utils/fetcher';
import NoAvatar from '@/assets/profileNotPhoto.svg';

export interface RenderAvatarProps {
  src?: string;
  sx?: SxProps<Theme> | undefined;
  alt?: string;
  variant?: 'circular' | 'square' | 'rounded' | undefined;
  component?: React.ElementType<any>;
  href?: string;
  bucket?: BucketType;
  name?: string;
  save?: boolean;
}

export const RenderAvatar: React.FC<
  React.PropsWithChildren<RenderAvatarProps>
> = ({
  children,
  src,
  alt,
  href,
  sx,
  variant,
  component,
  bucket = 'incicle',
  save = false,
  ...rest
}) => {
  const [url, setUrl] = useState('');
  const localStorageUrl = localStorage.getItem('avatar');

  const fetchAvatar = React.useCallback(async () => {
    if (!src) return;
    const data = await fetcher({ src, bucket });
    setUrl(data);
    if (save) localStorage.setItem('avatar', data);
  }, [src, bucket, save]);

  useEffect(() => {
    if (!src || localStorageUrl) return;
    fetchAvatar();
  }, [src, bucket, save, localStorageUrl, fetchAvatar]);

  return (
    <Avatar
      variant={variant}
      alt={alt}
      src={localStorageUrl || url || NoAvatar}
      sx={sx}
      component={component || 'div'}
      href={href}
      {...rest}
    >
      {children}
    </Avatar>
  );
};
