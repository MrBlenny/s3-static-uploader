import { S3 } from 'aws-sdk';
import { readFile } from 'fs-extra';
import { promisify } from '../utils/promisify'
import { getType } from 'mime';

export async function uploadObject (
  s3: S3,                // An initialised and configured S3 Lib
  bucketName: string,    // The name of the bucket you want to delete items from
  path: string,          // The path of the item you want to upload
  directoryPath: string, // The root directory path
  pathTransform?: (key: string) => string, // Function that transforms the path name
 ) {
  const body = await readFile(path);
  const pathWithoutRoot = path.replace(`${directoryPath}/`, '');
  const Key = pathTransform ? pathTransform(pathWithoutRoot) : pathWithoutRoot;
  const params = {
    ContentType: getType(pathWithoutRoot),
    Bucket: bucketName,
    Key,
    Body: body,
  };

  return promisify(s3.putObject.bind(s3))(params);
}