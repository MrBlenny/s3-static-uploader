import { S3 } from 'aws-sdk';
import { promisify } from '../utils/promisify';

export async function staticWebsiteSetup (
  s3: S3,             // An initialised and configured S3 Lib
  bucketName: string, // The name of the bucket we want to update
) {
  const params = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      IndexDocument: {
        Suffix: 'index',
      },
    },
  };
  return promisify(s3.putBucketWebsite)(params);
}
