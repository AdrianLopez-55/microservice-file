import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import * as bodyParser from 'body-parser';
import './dotenv.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Files Uploader')
    .setDescription('The Files Uploader API')
    .setVersion('1.0')
    .addTag('files')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT_APPLICATION);
  console.log(process.env.PORT_APPLICATION)
}
bootstrap();
