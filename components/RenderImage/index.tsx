import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getS3Object, BucketType } from "safira-app/services/aws/s3";
import { GetObjectRequest } from "aws-sdk/clients/s3";

export interface ImgProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  bucket: BucketType;
  options?: Omit<GetObjectRequest, "Bucket" | "Key">;
}

const RenderImage: React.FC<ImgProps> = ({ src, alt, style, bucket, options, ...rest }) => {
  const avatarUrl = useMemo(() => {
    let windowOrigin = window.location.origin;

    return `${windowOrigin}/${src}`;
  }, [src]);

  // const [url, setUrl] = useState('');

  // const fetcher = useCallback(async () => {
  //   try {
  //     if (src) {
  //       const imageUrl = await getS3Object({ src, bucket, ...options });
  //       return imageUrl.base64;
  //     }
  //   } catch (err) {
  //     return '';
  //   }
  // }, [src, bucket]);

  // useEffect(() => {
  //   if (src) {
  //     fetcher().then(data => {
  //       setUrl(data!);
  //     });
  //   }
  // }, [fetcher, src]);

  return <img style={{ width: "100%", height: "100%", ...style }} alt={alt} src={avatarUrl} {...rest} />;
};

export default RenderImage;
