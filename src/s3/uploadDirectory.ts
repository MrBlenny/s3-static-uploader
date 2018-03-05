import { S3 } from 'aws-sdk';
import { walkDirectory } from '../utils/walkDirectory';
import { uploadObject } from './uploadObject';

export async function uploadDirectory (
  s3: S3,                // An initialised and configured S3 Lib
  bucketName: string,    // The name of the bucket you want to delete items from
  directoryPath: string, // The object you want to delete
) {
  // Create an array of files in the directory
  const directoryFiles = await walkDirectory(directoryPath);
  // Upload every .json file in the directory
  return Promise.all(
    directoryFiles
      .filter((file) => file.endsWith('.json'))
      .map((file) => uploadObject(s3, bucketName, file, directoryPath)),
  );
}
