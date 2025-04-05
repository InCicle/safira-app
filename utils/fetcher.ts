import { BucketType, getS3Object } from '@/safira-app/services/aws/s3';

export async function fetcher(src: string, bucket: BucketType = 'incicle') {
  try {
    const imgUrl = await getS3Object({ bucket, src });
    return imgUrl.base64;
  } catch (err) {
    console.error(err);
  }
}
