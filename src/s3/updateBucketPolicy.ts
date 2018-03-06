import { S3 } from 'aws-sdk';
import { promisify } from '../utils/promisify';

export async function updateBucketPolicy (
  s3: S3,             // An initialised and configured S3 Lib
  bucketName: string, // The name of the bucket we want to update
  policy: {},         // JSON for the policy you want to apply
) {
  const params = {
    Bucket: bucketName,
    Policy: JSON.stringify(policy),
  };

  return promisify(s3.putBucketPolicy.bind(s3))(params);
}
