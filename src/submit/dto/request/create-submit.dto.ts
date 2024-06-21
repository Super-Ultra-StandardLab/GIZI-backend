import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { TimeType } from '../../entities/enum/time-type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmitDto {
  @IsString()
  @ApiProperty()
  programName: string;

  @IsEnum(TimeType)
  @ApiProperty()
  time: TimeType;

  @IsString()
  @Length(10, 10)
  @ApiProperty()
  date: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(1, 50)
  @ApiProperty()
  name: string;

  @IsPhoneNumber('KR')
  @Length(7, 15)
  @ApiProperty()
  phone: string;

  @IsString()
  @Length(1, 100)
  @ApiProperty()
  organization: string;

  @IsInt()
  @ApiProperty()
  participant: number;

  @IsString()
  @ApiProperty()
  grade: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  question?: string;
}
