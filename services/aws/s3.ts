import AWS from "aws-sdk";
import { links } from "app/config/links";
import { GetObjectRequest } from "aws-sdk/clients/s3";

export type BucketType = "incicle" | "projects";

export interface GetS3ObjectsPropsInterface extends Omit<GetObjectRequest, "Bucket" | "Key"> {
  src: string;
  bucket: BucketType;
}

export interface S3ObjectsReturnInterface {
  url: string;
  blob: Blob;
  base64: string;
}

const awsS3 = new AWS.S3();

function getBucketName(bucket: "incicle" | "projects"): string {
  switch (bucket) {
    case "incicle":
      return links.aws.bucket;

    case "projects":
      return links.aws_project.bucket;

    default:
      return "";
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

function fetchFile(src: string, bucket: string, options?: Omit<GetObjectRequest, "Bucket" | "Key">) {
  return new Promise<AWS.S3.GetObjectOutput>((resolve, reject) => {
    awsS3.getObject({ Bucket: bucket, Key: src, ...options }, (err, response) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

export async function getS3Object({ src, bucket, ...rest }: GetS3ObjectsPropsInterface) {
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

  if (bucket === "incicle") {
    awsS3.config.update({
      accessKeyId: links.aws.access_key_id,
      secretAccessKey: links.aws.secret_access_key,
      region: links.aws.region,
    });
  } else if (bucket === "projects") {
    awsS3.config.update({
      accessKeyId: links.aws_project.access_key_id,
      secretAccessKey: links.aws_project.secret_access_key,
      region: links.aws_project.region,
    });
  }

  const response = await fetchFile(src, getBucketName(bucket), rest);
  const base64 = await uint8ToBase64(response.Body as any, response.ContentType);

  return { base64 };
}
