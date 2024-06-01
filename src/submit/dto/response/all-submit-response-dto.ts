import { Expose, plainToInstance } from 'class-transformer';
import { TimeType } from '../../entities/enum/time-type';
import { Submit } from 'src/submit/entities/submit.entity';

export class ResponseAllSubmitDto {
  @Expose()
  programId: bigint;

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

  static listOf(submit: Submit[]): ResponseAllSubmitDto[] {
    return plainToInstance(ResponseAllSubmitDto, submit);
  }
}
