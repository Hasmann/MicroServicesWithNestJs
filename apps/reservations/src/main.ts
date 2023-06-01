import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe, Logger as commonLogger } from '@nestjs/common';
import { Logger as pinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  console.log('SERVER RUNNINGGS');
  const logger = new commonLogger();
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(pinoLogger));

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  logger.log(`Server Running On Port:${PORT}`);
  await app.listen(PORT);
}
bootstrap();
