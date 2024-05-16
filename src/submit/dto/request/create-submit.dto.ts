import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
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

  @IsPhoneNumber()
  phone: string;

  @IsString()
  organization: string;

  @IsInt()
  participant: number;

  @IsInt()
  grade: number;

  @IsEmpty()
  @IsString()
  question: string;
}
