import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import {MinioModule} from "nestjs-minio-client";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        endPoint: 'localhost',
        port: Number(configService.get<number>('MINIO_PORT')),
        useSSL: false,  //If on localhost, keep it at false. If deployed on https, change to true
        accessKey: configService.get<string>('MINIO_ACCESS_KEY'),
        secretKey: configService.get<string>('MINIO_SECRET_KEY')
      }),
      inject: [ConfigService]
    })
    // MinioModule.register({
    //     endPoint: 'localhost',
    //     port: 9000,
    //     useSSL: false,  //If on localhost, keep it at false. If deployed on https, change to true
    //     accessKey: 'iF3JgLWGwJRb5hrw7BEC',
    //     secretKey: 'gunusJ3YI7o9W05oXS8w7pHQfcLpZSLnHv5nBkyg'
    // })

  ],
  providers: [MinioClientService],
  exports: [MinioClientService]
})
export class MinioClientModule {}
