import { S3Client, GetObjectCommand, GetObjectCommandInput } from '@aws-sdk/client-s3';
import { links } from '@/safira-app/config/links';

export type BucketType = 'incicle' | 'projects';

export type S3AttachmentArgs = Omit<GetObjectCommandInput, 'Bucket' | 'Key'> & {
  bucket: BucketType;
  src: string;
};

export interface S3ObjectsReturnInterface {
  url: string;
  blob: Blob;
  base64: string;
}

function getBucketName(bucket: BucketType): string {
  switch (bucket) {
    case 'incicle':
      return links.aws.bucket;

    case 'projects':
      return links.aws_project.bucket;

    default:
      return '';
  }
}

async function fetchFile(src: string, bucket: string, s3: S3Client) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: src });

  try {
    const response = await s3.send(command);
    const base64 = await response.Body?.transformToString('base64');
    return { base64, type: response.ContentType };
  } catch (err) {
    // console.error(err);
    return null;
  }
}

export async function getS3Object({ src, bucket }: S3AttachmentArgs) {
  const s3 = new S3Client({
    region: bucket === links.aws_project.bucket ? links.aws_project.region : links.aws.region,
    credentials: {
      accessKeyId: links.aws.access_key_id,
      secretAccessKey: links.aws.secret_access_key,
    },
  });

  const response = await fetchFile(src, getBucketName(bucket), s3);

  return {
    base64: response?.base64 || '',
    type: response?.type || '',
  };
}
