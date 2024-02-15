import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;
if (AWS_ACCESS_KEY === undefined || AWS_SECRET_ACCESS_KEY === undefined) {
  throw new Error('Environment variables missing: AWS_ACCESS_KEY or AWS_ACCESS_KEY');
}

export const client = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  }
});