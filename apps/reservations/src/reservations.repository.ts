import { AbstractRepository } from '@app/common/database';
import { Injectable, Logger } from '@nestjs/common';
import { reservationDocument } from './reservations/Model/reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class reservationRepository extends AbstractRepository<reservationDocument> {
  protected readonly logger = new Logger();
  constructor(
    @InjectModel(reservationDocument.name)
    reservationModel: Model<reservationDocument>,
  ) {
    super(reservationModel);
  }
}
