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

export const findAllResponseData: Submit[] = [
  {
    programId: 1,
    programName: '테스트프로그램1',
    time: TimeType.ALLDAY,
    date: '2024-06-17',
    email: 'imtester1234@gmail.com',
    name: 'testname',
    phone: '01073150229',
    organization: '부산소프트웨어마이스터고등학교',
    participant: 123,
    grade: '1,2학년',
    question: '으하하',
  },
  {
    programId: 2,
    programName: '테스트프로그램2',
    time: TimeType.ALLDAY,
    date: '2024-06-18',
    email: 'imtester1234@gmail.com',
    name: 'testname',
    phone: '01012341234',
    organization: '부산소프트웨어마이스터고등학교',
    participant: 123,
    grade: '1,2학년',
    question: 'test',
  },
];

export const findOneResponseData: Submit = {
  programId: 1,
  programName: '테스트프로그램1',
  time: TimeType.ALLDAY,
  date: '2024-06-17',
  email: 'imtester1234@gmail.com',
  name: 'testname',
  phone: '01073150229',
  organization: '부산소프트웨어마이스터고등학교',
  participant: 123,
  grade: '1,2학년',
  question: '으하하',
};

export const findOneRequestId: number = 1;
