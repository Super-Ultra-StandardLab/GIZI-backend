import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateSubmitDto {
  @IsString()
  programName: string;

  //@IsEnum(TimeType) 왜 안되지..
  @IsNotEmpty()
  time: string;

  @IsString()
  date: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsPhoneNumber('KR')
  phone: string;

  @IsString()
  organization: string;

  @IsInt()
  participant: number;

  @IsInt()
  grade: number;

  @IsOptional()
  @IsString()
  question?: string;
}
