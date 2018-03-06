# S3 Static Uploader

This provides a few utils that make manipulating your s3 bucket easy. It is designed to upload an entire directory and configure it for static hosting.
This is specifically designed for uploaded json files. I/you should probably change this (by removing the hardcoded content-type in `./s3/uploadObject`).

Install with:
`npm i s3-static-uploader`

The following utils are made available. Their interfaces are typed with typescript so you should get i/o annotations.

* clearBucket
* createBucket
* deleteBucket
* listBucketObjects
* staticWebsiteSetup
* updateBucketPolicy
* uploadDirectory
* uploadObject

### Example

If you want to upload your directory and configure it for public static hosting:

```js
// tslint:disable:no-console
import * as AWS from 'aws-sdk';
import { join } from 'path';
import { 
  clearBucket,
  staticWebsiteSetup,
  updateBucketPolicy,
  uploadDirectory,
} from 's3-static-uploader';

// Set the bucket name
const bucketName = 'YOUR_BUCKET_NAME_GOES_HERE';

// Create the bucket policy
const policy = {
  Version: '2008-10-17',
  Statement: [
    {
      Sid: 'PublicReadForGetBucketObjects',
      Effect: 'Allow',
      Principal: {
        AWS: '*',
      },
      Action: 's3:GetObject',
      Resource: `arn:aws:s3:::${bucketName}/*`,
    },
  ],
};

// Initialise the s3 lib
AWS.config.update(CONFIGURE_YOUR_AWS_LIB_WITH_YOUR_CREDS);
const s3 = new AWS.S3({ signatureVersion: 'v4' });

// Start publishing
void (async () => {
  console.log(`☁️  Deploying to AWS Bucket: ${bucketName}`);
  console.log(`🗃️  Creating bucket...`);
  await createBucket(s3, bucketName);
  console.log(`📜  Setting bucket policy.`);
  await updateBucketPolicy(s3, bucketName, policy);
  console.log(`📜  Setting bucket as static website.`);
  await staticWebsiteSetup(s3, bucketName);
  console.log(`✨  Cleaning out bucket contents.`);
  await clearBucket(s3, bucketName);
  console.log(`💾  Uploading files.`);
  // Put the path to the directory you want to upload below
  const uploads = await uploadDirectory(s3, bucketName, join(__dirname, '../../build');
  console.log(`🏁  Upload Complete. ${uploads.length} files uploaded.`);
})();
```