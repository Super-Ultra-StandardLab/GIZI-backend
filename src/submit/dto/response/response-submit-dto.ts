import { Submit } from 'src/submit/entities/submit.entity';

export class ResponseSubmitDto {
  programName: string;

  time: string;

  date: string;

  email: string;

  name: string;

  phone: string;

  organization: string;

  participant: number;

  grade: number;

  question?: string;

  static of(submit: Submit): ResponseSubmitDto {
    return {
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
    };
  }
}
