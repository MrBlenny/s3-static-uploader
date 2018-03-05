import { S3 } from 'aws-sdk';
import { deleteObject } from './deleteObject';
import { listBucketObjects } from './listBucketObjects';

export async function clearBucket (
  s3: S3,             // An initialised and configured S3 Lib
  bucketName: string, // The name of the bucket we want to create
) {
  const contents = await listBucketObjects(s3, bucketName);
  const deleteItems = contents && contents.Contents 
    ? contents.Contents.map((item: S3.Object) => deleteObject(s3, bucketName, item.Key))
    : []
  return Promise.all(deleteItems);
}
