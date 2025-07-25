import { FC, HTMLAttributes, useCallback, useEffect } from 'react';
import { BucketType } from '@/services/aws/s3';
import { fetcher } from '@/utils/fetcher';
import { INCICLE_LOGO } from '@/utils/constants';

export interface ImgProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  bucket?: BucketType;
  options?: any;
}

export const RenderLogo: FC<ImgProps> = ({
  src,
  alt,
  style,
  bucket = 'incicle',
  options,
  ...rest
}) => {
  const localStorageUrl = localStorage.getItem('logo');

  const fetchLogo = useCallback(async () => {
    const data = await fetcher({ src, bucket, options });
    localStorage.setItem('logo', data);
  }, [src, bucket, options]);

  useEffect(() => {
    if (localStorageUrl || (src === null && !localStorageUrl)) return;
    fetchLogo();
  }, [localStorageUrl, fetchLogo, src]);

  return (
    <img
      style={{ width: '100%', height: '100%', ...style }}
      alt={alt}
      src={localStorageUrl || INCICLE_LOGO}
      {...rest}
    />
  );
};
