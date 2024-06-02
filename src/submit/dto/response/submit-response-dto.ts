import { Expose, plainToInstance } from 'class-transformer';
import { TimeType } from '../../entities/enum/time-type';
import { Submit } from 'src/submit/entities/submit.entity';

export class ResponseSubmitDto {
  @Expose()
  programId: number;

  @Expose()
  programName: string;

  @Expose()
  time: TimeType;

  @Expose()
  date: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  organization: string;

  @Expose()
  participant: number;

  @Expose()
  grade: string;

  @Expose()
  question: string;

  static of(submit: Submit): ResponseSubmitDto {
    return plainToInstance(ResponseSubmitDto, submit);
  }
}
