import { S3 } from 'aws-sdk';
import { readFile } from 'fs-extra';
import { promisify } from '../utils/promisify'

export async function uploadObject (
  s3: S3,                // An initialised and configured S3 Lib
  bucketName: string,    // The name of the bucket you want to delete items from
  path: string,          // The path of the item you want to upload
  directoryPath: string, // The root directory path
 ) {
  const body = await readFile(path);

  const params = {
    ContentType: 'application/json',
    Bucket: bucketName,
    Key: path.replace(`${directoryPath}/`, '').replace('.json', ''),
    Body: body,
  };

  return promisify(s3.putObject)(params);
}