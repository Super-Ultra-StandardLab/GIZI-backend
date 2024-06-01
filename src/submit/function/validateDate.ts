import { ConflictException } from '@nestjs/common';
import { TimeType } from '../entities/enum/time-type';
import { CreateSubmitDto } from '../dto/request/create-submit.dto';
import { Submit } from '../entities/submit.entity';

export function validateDate(checkDate, createSubmitDto: CreateSubmitDto) {
  if (createSubmitDto.time === TimeType.ALLDAY && checkDate.length !== 0) {
    throw new ConflictException('선택하신 시간에 이미 신청자가 존재합니다.'); // FIXME: 나중에 한번에 customException으로 처리하기
  }
  checkDate.forEach((item: Submit) => {
    if (item.time === createSubmitDto.time || item.time === 'allday') {
      throw new ConflictException(
        '선택하신 시간에 이미 신청자가 존재합니다.', // FIXME: 나중에 한번에 customException으로 처리하기
      );
    }
  });
}
