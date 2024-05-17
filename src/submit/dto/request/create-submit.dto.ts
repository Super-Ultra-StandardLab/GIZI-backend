import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { TimeType } from '../../entities/enum/time-type';

export class CreateSubmitDto {
  @IsString()
  programName: string;

  @IsEnum(TimeType)
  time: TimeType;

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
