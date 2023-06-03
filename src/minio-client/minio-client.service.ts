import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {MinioService} from "nestjs-minio-client";
import * as process from "process";
import {BufferedFile} from "./file.model";
import * as crypto from "crypto"
import * as Minio from 'minio'

@Injectable()
export class MinioClientService {

  private minioClient: Minio.Client
  private static readonly BUCKET_NAME = 'olp_bucket'
  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioService')

    // THIS IS THE POLICY
    // const policy = {
    //   Version: '2012-10-17',
    //   Statement: [
    //     {
    //       Effect: 'Allow',
    //       Principal: {
    //         AWS: ['*'],
    //       },
    //       Action: [
    //         's3:ListBucketMultipartUploads',
    //         's3:GetBucketLocation',
    //         's3:ListBucket',
    //       ],
    //       Resource: ['arn:aws:s3:::olp-bucket'], // Change this according to your bucket name
    //     },
    //     {
    //       Effect: 'Allow',
    //       Principal: {
    //         AWS: ['*'],
    //       },
    //       Action: [
    //         's3:PutObject',
    //         's3:AbortMultipartUpload',
    //         's3:DeleteObject',
    //         's3:GetObject',
    //         's3:ListMultipartUploadParts',
    //       ],
    //       Resource: ['arn:aws:s3:::olp-bucket/*'], // Change this according to your bucket name
    //     },
    //   ],
    // };
    // this.client.setBucketPolicy(
    //     process.env.MINIO_BUCKET_NAME,
    //     JSON.stringify(policy),
    //     function (err:any) {
    //       if (err) throw err;

    //       console.log('Bucket policy set');
    //     },
    // );
  }






  private readonly logger: Logger
  private readonly bucketName = process.env.MINIO_BUCKET_NAME

  public get client() {
    return this.minio.client
  }



  public async upload(file: BufferedFile, bucketName: string = this.bucketName) {
    if (!file.mimetype.includes('mp4')) {
      throw new HttpException('File type not supported', HttpStatus.BAD_REQUEST);
    }
  
    const timestamp = Date.now().toString();
    const hashedFileName = crypto.createHash('md5').update(timestamp).digest('hex');
    const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData = {
      'Content-Type': file.mimetype,
    };
    const fileName = hashedFileName + extension;
  
    try {
      await this.client.putObject(bucketName, fileName, file.buffer, metaData);
      return {
        url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
  }

}
