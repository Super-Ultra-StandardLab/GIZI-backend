import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  length,
} from 'class-validator';
import { TimeType } from '../../entities/enum/time-type';

export class CreateSubmitDto {
  @IsString()
  programName: string;

  @IsEnum(TimeType)
  time: TimeType;

  @IsString()
  @Length(10, 10)
  date: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsPhoneNumber('KR')
  @Length(7, 15)
  phone: string;

  @IsString()
  @Length(1, 100)
  organization: string;

  @IsInt()
  participant: number;

  @IsString()
  grade: string;

  @IsOptional()
  @IsString()
  question?: string;
}
