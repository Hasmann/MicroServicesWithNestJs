import { AbstractDocument } from '@app/common/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class userDocument extends AbstractDocument {
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const userSchema = SchemaFactory.createForClass(userDocument);
