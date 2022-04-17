import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

(async () => {
  const fastify = new FastifyAdapter({
    logger: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(
    Number(process.env.APP_PORT) || 3000,
    process.env.APP_HOST || '0.0.0.0',
  );
})();
