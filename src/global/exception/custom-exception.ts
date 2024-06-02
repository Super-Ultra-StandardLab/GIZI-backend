import { HttpException, HttpStatus } from '@nestjs/common';

export class DateConflictException extends HttpException {
  constructor() {
    super('선택하신 시간에 이미 신청자가 존재합니다.', HttpStatus.CONFLICT);
  }
}
