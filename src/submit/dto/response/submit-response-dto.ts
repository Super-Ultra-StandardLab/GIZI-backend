import { Expose, plainToInstance } from 'class-transformer';
import { TimeType } from '../../entities/enum/time-type';
import { Submit } from 'src/submit/entities/submit.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseSubmitDto {
  @Expose()
  @ApiProperty()
  programId: number;

  @Expose()
  @ApiProperty()
  programName: string;

  @Expose()
  @ApiProperty()
  time: TimeType;

  @Expose()
  @ApiProperty()
  date: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  phone: string;

  @Expose()
  @ApiProperty()
  organization: string;

  @Expose()
  @ApiProperty()
  participant: number;

  @Expose()
  @ApiProperty()
  grade: string;

  @Expose()
  @ApiProperty()
  question: string;

  static of(submit: Submit): ResponseSubmitDto {
    return plainToInstance(ResponseSubmitDto, submit);
  }
}
