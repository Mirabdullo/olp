import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'


async function start() {
  
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  app.enableCors()

  const swagger = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('OLP')
  .setDescription('Rest Api')
  .setVersion('1.0.0')
  .addTag('NodeJs, NestJs, Postgres, Sequalize')
  .build()

  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('/api/docs', app, document)


  await app.listen(PORT, () => {
    console.log(`Server is running.... http://localhost:${PORT}/api/docs`);
    
  });
}
start();
