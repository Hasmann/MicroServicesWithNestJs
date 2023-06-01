import { CardDto } from '@app/common/dto/card.dto';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
  isNotEmpty,
} from 'class-validator';

export class paymentChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
  @IsString()
  @IsNotEmpty()
  email: string;
}
