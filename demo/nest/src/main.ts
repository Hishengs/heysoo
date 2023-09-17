// ================= express =================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from '../../config.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.nest_fastify);
}
bootstrap();

// ================= fastify =================

/* import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as config from '../../config.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(config.nest_fastify);
}
bootstrap(); */
