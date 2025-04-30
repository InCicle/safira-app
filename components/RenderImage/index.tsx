import React, { useEffect, useState } from 'react';
import { BucketType } from '@/safira-app/services/aws/s3';
import { fetcher } from '@/safira-app/utils/fetcher';

export interface ImgProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  bucket?: BucketType;
  options?: any;
}

export const RenderImage: React.FC<ImgProps> = ({ src, alt, style, bucket = 'incicle', options, ...rest }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (src) {
      fetcher({ src, bucket, options }).then(data => {
        setUrl(data);
      });
    }
  }, [src, bucket, options]);

  return <img style={{ width: '100%', height: '100%', ...style }} alt={alt} src={url} {...rest} />;
};
