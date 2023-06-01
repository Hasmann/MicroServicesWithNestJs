import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsString,
  IsNotEmpty,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;
  @IsDate()
  @Type(() => Date)
  endDate: Date;
  @IsString()
  @IsNotEmpty()
  placeId: string;
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
