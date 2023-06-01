import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class sendMailDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
