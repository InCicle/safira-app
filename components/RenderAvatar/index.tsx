import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, SxProps, Theme } from '@mui/material';
import { getS3Object, BucketType } from '@/safira-app/services/aws/s3';

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

  const fetcher = useCallback(async () => {
    try {
      if (!src) return;

      const { base64: image } = await getS3Object({ src, bucket });
      return image;
    } catch {
      return '';
    }
  }, [src, bucket]);

  useEffect(() => {
    if (!src) return;

    fetcher().then(data => setUrl(data!));
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
