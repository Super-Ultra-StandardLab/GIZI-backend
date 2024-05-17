import { TimeType } from 'src/submit/entities/enum/time-type';
import { Submit } from 'src/submit/entities/submit.entity';

export class ResponseAllSubmitDto {
  programId: bigint;

  programName: string;

  time: TimeType;

  date: string;

  email: string;

  name: string;

  phone: string;

  organization: string;

  participant: number;

  grade: string;

  question: string;

  static of(submit: Submit[]): ResponseAllSubmitDto[] {
    return submit.map((submit) => ({
      programId: submit.programId,

      programName: submit.programName,

      time: submit.time,

      date: submit.date,

      email: submit.email,

      name: submit.name,

      phone: submit.phone,

      organization: submit.organization,

      participant: submit.participant,

      grade: submit.grade,

      question: submit.question,
    }));
  }
}
