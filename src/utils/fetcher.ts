import { BucketType, getS3Object } from '@/services/aws/s3';

interface FetcherOptions {
  bucket?: BucketType;
  src: string;
  options?: any;
}

export async function fetcher({
  src,
  bucket,
  options,
}: FetcherOptions): Promise<string> {
  try {
    const imgUrl = await getS3Object({ bucket, src, ...options });
    return imgUrl.base64;
  } catch (err) {
    console.error(err);
    return '';
  }
}
