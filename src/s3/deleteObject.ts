import { S3 } from 'aws-sdk';
import { promisify } from '../utils/promisify';

export async function deleteObject (
  s3: S3,                   // An initialised and configured S3 Lib
  bucketName: string,       // The name of the bucket you want to delete items from
  key: string | undefined,  // The object you want to delete
) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  return promisify(s3.deleteObject)(params);
}
