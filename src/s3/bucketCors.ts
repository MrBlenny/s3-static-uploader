import { S3 } from 'aws-sdk';
import { promisify } from '../utils/promisify';

export async function bucketCors (
  s3: S3,             // An initialised and configured S3 Lib
  bucketName: string, // The name of the bucket we want to create
) {
  const params = {
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [{
        AllowedMethods: ['GET'],
        AllowedOrigins: ['*'],
        AllowedHeader: ['*'],
      }]
    },
  };
  return promisify(s3.putBucketCors.bind(s3))(params)
}
