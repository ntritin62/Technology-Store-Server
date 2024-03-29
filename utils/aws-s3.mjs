import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
  region: 'ap-southeast-1',
});

export const uploadToS3 = async (file, product, prefix) => {
  const key = `${product}-${prefix}`;

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    const response = await s3.send(command);

    return { key };
  } catch (error) {
    return { error };
  }
};

export const getImageUrl = async ({ key }) => {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });

  return getSignedUrl(s3, command, { expiresIn: 900 }); // default
};
