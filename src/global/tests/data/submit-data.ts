// test-helpers.ts
import { Submit } from 'src/submit/entities/submit.entity';
import { TimeType } from '../../../submit/entities/enum/time-type';
import { CreateSubmitDto } from 'src/submit/dto/request/create-submit.dto';

export const alldayTypeSubmitData: CreateSubmitDto = {
  programName: 'testProgram',
  time: TimeType.ALLDAY,
  date: '2024-06-02',
  email: 'test@naver.com',
  name: 'tester',
  phone: '01012341234',
  organization: 'testOrganization',
  participant: 100,
  grade: '1',
  question: 'testQuestion',
};

export const morningTypeSubmitData: CreateSubmitDto = {
  programName: 'testProgram',
  time: TimeType.MORNING,
  date: '2024-06-02',
  email: 'test@naver.com',
  name: 'tester',
  phone: '01012341234',
  organization: 'testOrganization',
  participant: 100,
  grade: '1',
  question: 'testQuestion',
};

export const afternoonTypeSubmitData: CreateSubmitDto = {
  programName: 'testProgram',
  time: TimeType.MORNING,
  date: '2024-06-02',
  email: 'test@naver.com',
  name: 'tester',
  phone: '01012341234',
  organization: 'testOrganization',
  participant: 100,
  grade: '1',
  question: 'testQuestion',
};

export const alldayTypeResponseData: Submit = {
  programId: 1,
  programName: 'testProgram',
  time: TimeType.ALLDAY,
  date: '2024-06-02',
  email: 'test@naver.com',
  name: 'tester',
  phone: '01012341234',
  organization: 'testOrganization',
  participant: 100,
  grade: '1',
  question: 'testQuestion',
};

export const morningTypeResponseData: Submit = {
  programId: 1,
  programName: 'testProgram',
  time: TimeType.MORNING,
  date: '2024-06-02',
  email: 'test@naver.com',
  name: 'tester',
  phone: '01012341234',
  organization: 'testOrganization',
  participant: 100,
  grade: '1',
  question: 'testQuestion',
};
