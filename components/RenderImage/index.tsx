import React, { useCallback, useEffect, useState } from 'react';
import { BucketType, getS3Object } from '@/safira-app/services/aws/s3';

export interface ImgProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  bucket?: BucketType;
  options?: any;
}

const RenderImage: React.FC<ImgProps> = ({ src, alt, style, bucket = "incicle", options, ...rest }) => {
  const [url, setUrl] = useState('');


  const fetcher = useCallback(async () => {
    try {
      if (src) {
        const imageUrl = await getS3Object({ src, bucket, ...options });
        return imageUrl.base64;
      }
    } catch {
      return '';
    }
  }, [src, bucket]); // eslint-disable-line

  useEffect(() => {
    if (src) {
      fetcher().then(data => {
        setUrl(data!);
      });
    }
  }, [fetcher, src]);

  return <img style={{ width: '100%', height: '100%', ...style }} alt={alt} src={url} {...rest} />;
};

export default RenderImage;
