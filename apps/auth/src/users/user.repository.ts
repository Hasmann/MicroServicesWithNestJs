import { AbstractRepository } from '@app/common/database';
import { Injectable, Logger } from '@nestjs/common';
import { userDocument } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepo extends AbstractRepository<userDocument> {
  protected readonly logger = new Logger();
  constructor(@InjectModel(userDocument.name) userModel: Model<userDocument>) {
    super(userModel);
  }
}
