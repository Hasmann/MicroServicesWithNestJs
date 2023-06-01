import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { Logger as pinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser());
  console.log('AUTH SERVER RUNNING');
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const PORT = configService.get('HTTP_PORT');
  app.useLogger(app.get(pinoLogger));
  app.startAllMicroservices();
  await app.listen(PORT);
  logger.verbose(`APP RUNNING ON PORT:${PORT}`);
}
bootstrap();
