import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { sendMailDto } from './dto';
@Injectable()
export class NotificationsService {
  private Transport = nodemailer.createTransport({
    service: 'SendinBlue',
    auth: {
      user: 'abdulazizkadeem@gmail.com',
      pass: 'VXxn1aIGmSB8gj2H',
    },
  });
  constructor(private readonly configService: ConfigService) {}
  async sendMail(data: sendMailDto) {
    const options = {
      from: 'abdulazizhassankehinde@gmail.com',
      to: data.email,
      subject: 'BOOKING EMAIL',
      text: data.message,
    };

    return this.Transport.sendMail(options, (error, info) => {
      if (error) console.log('errrrrrr', error);
      else console.log('EMAIL SENT SUCCESSFULLY');
    });
  }
}
