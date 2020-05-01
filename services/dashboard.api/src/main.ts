import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from 'nestjs-config';

import { EnvType } from '@common/constants';
import { AppModule } from '@modules/app';

const logger = new Logger('ApplicationBootstrap');

async function bootstrap(): Promise<void> {
  // create application instance
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // get configurations
  const config: ConfigService = app.get(ConfigService);
  const {
    ENV, SWAGGER_URL, SWAGGER_OPTIONS, HTTP_HOST, HTTP_PORT, 
  } = config.get('app');
  const isProduction = ENV === EnvType.production;

  // bind validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProduction,
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: false,
    }),
  );

  // development only
  if (!isProduction) {
    // apply CORS
    app.enableCors({
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });

    // setup [swagger](https://swagger.io)
    const document = SwaggerModule.createDocument(app, SWAGGER_OPTIONS);
    SwaggerModule.setup(SWAGGER_URL, app, document);
  }

  // start http server
  await app.listen(HTTP_PORT, HTTP_HOST);
  const url = await app.getUrl();

  logger.log(`HTTP server is up & running on ${url}`);
  logger.log(`Swagger on ${url}${SWAGGER_URL}`);
}

bootstrap();
