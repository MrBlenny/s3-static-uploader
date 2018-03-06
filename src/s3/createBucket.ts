import { S3 } from 'aws-sdk';
import { promisify } from '../utils/promisify';

export async function createBucket (
  s3: S3,             // An initialised and configured S3 Lib
  bucketName: string, // The name of the bucket we want to create
) {
  const params = {
    Bucket: bucketName,
    ACL: 'public-read',
  };

  return promisify(s3.createBucket.bind(s3), true)(params)
}
