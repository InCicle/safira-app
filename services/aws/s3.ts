// import AWS from 'aws-sdk';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { links } from '@/safira-app/config/links';
// import { GetObjectRequest } from 'aws-sdk/clients/s3';

export type BucketType = 'incicle' | 'projects';

// export interface GetS3ObjectsPropsInterface extends Omit<GetObjectRequest, 'Bucket' | 'Key'> {
//   src: string;
//   bucket: BucketType;
// }

export interface S3ObjectsReturnInterface {
  url: string;
  blob: Blob;
  base64: string;
}

function getBucketName(bucket: 'incicle' | 'projects'): string {
  switch (bucket) {
    case 'incicle':
      return links.aws.bucket;

    case 'projects':
      return links.aws_project.bucket;

    default:
      return '';
  }
}

async function uint8ToBase64(data: Uint8Array, contentType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = err => reject(err);
    fileReader.readAsDataURL(new Blob([data], { type: contentType }));
  });
}

async function fetchFile(src: string, bucket: string, s3: S3Client) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: src });

  try {
    const response = await s3.send(command);
    return await response.Body?.transformToString();
  } catch (err) {
    console.error(err);
    return '';
  }
}

export async function getS3Object({ src, bucket, ...rest }: any) {
  /**
   * This function gets an object from bucket.
   *
   * params:
   *  src: string - the path of the object in the bucket.
   *  bucket: string - the bucket name.
   *
   * return: Promise<{
              url: string;
              blob: Blob;
              base64: string;
            }>
   */

  const s3 = new S3Client({
    region: bucket === links.aws_project.region ? links.aws_project.region : links.aws.region,
    credentials: {
      accessKeyId: links.aws.access_key_id,
      secretAccessKey: links.aws.secret_access_key,
    },
  });

  const response = await fetchFile(src, getBucketName(bucket), s3);
  // const base64 = await uint8ToBase64(response.Body as any, response.ContentType);

  console.log(response);

  return { base64: '' };
}
