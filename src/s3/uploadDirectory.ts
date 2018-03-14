import { S3 } from 'aws-sdk';
import { walkDirectory } from '../utils/walkDirectory';
import { uploadObject } from './uploadObject';

export async function uploadDirectory (
  s3: S3,                // An initialised and configured S3 Lib
  bucketName: string,    // The name of the bucket you want to delete items from
  directoryPath: string, // The object you want to delete
  pathTransform: (key: string) => string, // Function that transforms the path name
) {
  // Create an array of files in the directory
  const directoryFiles = await walkDirectory(directoryPath);
  // Upload every file in the directory
  return Promise.all(
    directoryFiles
      .filter((file) => file.split('.').length > 1)
      .map((file) => uploadObject(s3, bucketName, file, directoryPath, pathTransform)),
  );
}
