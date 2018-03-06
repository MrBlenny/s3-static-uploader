import { S3 } from 'aws-sdk';
import { promisify } from '../utils/promisify';

export async function listBucketObjects (
  s3: S3,             // An initialised and configured S3 Lib
  bucketName: string, // The name of the bucket you want to list contents for
): Promise<S3.ListObjectsOutput> {
  const params = {
    Bucket: bucketName,
  };

  return promisify(s3.listObjects.bind(s3))(params);
}
