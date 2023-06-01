import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { Logger as conLog } from '@nestjs/common';
async function bootstrap() {
  const log = new conLog();
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('PORT'),
    },
  });
  log.verbose(`PAYMENT MICROSERVICE RUNNING..ON PORT: ${PORT}`);
  console.log(`PAYMENT MICROSERVICE RUNNING..ON PORT: ${PORT}`);
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
