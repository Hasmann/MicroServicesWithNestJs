import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: PORT,
    },
  });
  app.useLogger(app.get(Logger));
  console.log(`NOTIFICATIONS MICROSERVICE RUNNING ON PORT:${PORT}`);
  await app.startAllMicroservices();
}
bootstrap();
