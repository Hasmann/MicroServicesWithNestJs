import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { paymentChargeDto } from './dto/paymentChargeDto';
@Injectable()
export class PaymentsService {
  private stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
    apiVersion: '2022-11-15',
  });
  constructor(
    private configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private notificationsService: ClientProxy,
  ) {}
  async createCharge({ card, amount, email }: paymentChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    const message = `your payment of ${amount} has been received`;
    this.notificationsService.emit('notify_email', { email, message });
    return paymentIntent;
  }
}
